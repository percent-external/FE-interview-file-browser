import { ApolloServer, makeExecutableSchema } from 'apollo-server';

import { typeDefs } from './schema';
import { Entry, Resolvers, File, Directory, Pagination } from './generated/schema';
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

const PAGE_SIZE = 25;
const slicePage = <T>(entries: T[], page: number) => {
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

const buildPagination = (entries: any[], page: number): Pagination => {
  return {
    page,
    pageCount: Math.ceil(entries.length / PAGE_SIZE),
    prevPage: page === 1 ? null : page - 1,
    nextPage: page * PAGE_SIZE >= entries.length ? null : page + 1
  };
};

const resolvers: Resolvers = {
  Query: {
    listEntries(_root, { path, page }) {
      page = page || 1;

      if (!path.startsWith('/')) {
        throw new Error(`Path must start with a '/'`);
      }

      const pathSegments = path === '/' ? [''] : path.split('/');
      const result = lookupPath(path.split('/'));

      const entries = result.isFile
        ? [mapOutput(result, pathSegments)]
        : result.entries.map(e => mapOutput(e, pathSegments));

      return {
        entries: slicePage(entries, page),
        pagination: buildPagination(entries, page)
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
