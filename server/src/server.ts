import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import compact from 'lodash/compact'
import map from 'lodash/map'

import { typeDefs } from './schema';
import { Entry, Resolvers, File, Directory, Pagination, WhereInput, Maybe } from './generated/schema';
import { Entry as FileSystemEntry, File as FileSystemFile, Directory as FileSystemDirectory, lookupPath } from './db';

const mapFileOutput = (file: FileSystemFile, pathSegments: string[]): File => {
  const path = [...pathSegments, file.name].join('/')
  return {
    name: file.name,
    size: file.size,
    lastModified: file.lastModified,
    path,
    id: path,
  };
};

const mapDirectoryOutput = (directory: FileSystemDirectory, pathSegments: string[]): Directory => {
  const path = [...pathSegments, directory.name].join('/')
  return {
    name: directory.name,
    path,
    id: path,
  };
};

const mapOutput = (entry: FileSystemEntry, pathSegments: string[]): Entry => {
  if (entry.isFile) {
    return mapFileOutput(entry, pathSegments);
  } else {
    return mapDirectoryOutput(entry, pathSegments);
  }
};

const filterEntries = (entries: any[], where?: Maybe<WhereInput>): any[] => {
  if (where) {
    return compact(
      map(entries, (entry) => {
        let tmpEntry: FileSystemEntry | undefined = lookupPath(entry.path.split('/'))
        const lt = where.size_lt ?? 0
        const gt = where.size_gt ?? 0

        // Type
        if (where.type_eq) {
          if (where.type_eq === "Directory" && tmpEntry?.isFile) tmpEntry = undefined
          if (where.type_eq === "File" && tmpEntry?.isDirectory) tmpEntry = undefined
        }

        // Size
        if (tmpEntry?.isFile) {
          if (where.size_lt && where.size_gt) {
            if (tmpEntry.size < gt && tmpEntry.size > lt) tmpEntry = undefined
          } else if (where.size_lt && !where.size_gt) {
            if (tmpEntry.size > lt) tmpEntry = undefined
          } else if (where.size_gt && !where.size_lt) {
            if (tmpEntry.size < gt) tmpEntry = undefined
          }
        }

        // Name
        if (where.name_contains) {
          if (!tmpEntry?.name.toLowerCase().includes(where.name_contains)) tmpEntry = undefined
        }

        return tmpEntry ? entry : undefined
      })
    )
  }

  return entries
}

const PAGE_SIZE = 25;
const slicePage = <T>(
  entries: T[], 
  page: number,
) => {
  const pageCount = Math.ceil(entries.length / PAGE_SIZE);
  if (page < 1) {
    page = 1;
  } else if (page > pageCount) {
    page = pageCount;
  }

  const start = (page - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, entries.length);
  return [...entries].slice(start, end);
};

const buildPagination = (
  entries: any[], 
  page: number,
): Pagination => {
  
  return {
    page,
    pageCount: Math.ceil(entries.length / PAGE_SIZE),
    prevPage: page === 1 ? null : page - 1,
    nextPage: page * PAGE_SIZE >= entries.length ? null : page + 1,
    totalRows: entries.length,
  };
};

const resolvers: Resolvers = {
  Query: {
    listEntries(_root, { path, page, where }) {
      page = page || 1;

      if (!path.startsWith('/')) {
        throw new Error(`Path must start with a '/'`);
      }

      const pathSegments = path === '/' ? [''] : path.split('/');
      const result = lookupPath(path.split('/'));

      const entries = result.isFile
        ? [mapOutput(result, pathSegments)]
        : result.entries.map(e => mapOutput(e, pathSegments));

      const filteredEntries = filterEntries(entries as any, where)

      return {
        entries: slicePage(filteredEntries, page),
        pagination: buildPagination(filteredEntries, page)
      };
    }
  },
  Entry: {
    __resolveType(obj: Entry) {
      if (!Object.prototype.hasOwnProperty.call(obj, 'path')) {
        return null;
      }

      if (Object.prototype.hasOwnProperty.call(obj, 'size')) {
        return 'File';
      } else {
        return 'Directory';
      }
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers: resolvers as any });

const server = new ApolloServer({ schema });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
