import { DateTime } from 'luxon';
import { getRandomInt, getRandomString, pickRandom } from './util/rand';
import { Iterator, iterate } from './util/iter';

export type Entry = File | Directory;

interface FileSystemNode {
  isFile: boolean;
  isDirectory: boolean;
  name: string;
}

export interface File extends FileSystemNode {
  isFile: true;
  isDirectory: false;
  size: number;
  lastModified: string;
}

export interface Directory extends FileSystemNode {
  isFile: false;
  isDirectory: true;
  entries: Entry[];
}

const file: Pick<File, 'isFile' | 'isDirectory'> = { isFile: true, isDirectory: false };
const directory: Pick<Directory, 'isFile' | 'isDirectory'> = { isFile: false, isDirectory: true };

const mkFile = (name: string, size: number, lastModified: DateTime): File => {
  return {
    ...file,
    name,
    size,
    lastModified: lastModified.toISO()
  };
};

const mkInvoices = (): Entry[] => {
  const files: File[] = [];
  for (let i = 1; i <= 12; i++) {
    const month = i < 10 ? `0${i}` : i;
    const date = DateTime.fromISO(`2020-${month}-15T10:00:00.000Z`);
    files.push({
      ...file,
      name: `${date.toFormat('MMMM')}.pdf`,
      size: getRandomInt(1000000, 12000000),
      lastModified: date.toISO()
    });
  }

  return files;
};

const extensions = ['txt', 'pdf', 'csv', 'png', 'jpeg', 'ts'];
const mkRandomFile = (): File => {
  const name = getRandomString(12);
  const ext = pickRandom(extensions);
  return {
    ...file,
    name: `${name}.${ext}`,
    size: getRandomInt(0, 12000000),
    lastModified: DateTime.utc().toISO()
  };
};

const mapRandomFile = <T>(iterator: Iterable<T>) => {
  return Iterator.map((_) => mkRandomFile(), iterator);
};

export const fileSystem: Directory = {
  ...directory,
  name: '',
  entries: [
    {
      ...directory,
      name: 'documents',
      entries: [
        {
          ...directory,
          name: 'invoices',
          entries: mkInvoices()
        }
      ]
    },
    {
      ...directory,
      name: 'tmp',
      entries: Array.from(mapRandomFile(iterate(64)))
    },
    mkFile('README.md', 768, DateTime.utc())
  ]
};

export const lookupPath = (pathSegments: string[]): Entry => {
  return pathSegments.reduce(
    (entry, pathSegment) => {
      if (pathSegment === '') {
        return entry;
      } else if (entry.isFile) {
        throw new Error(`Cannot get subdirectory ${pathSegment} from ${entry.name} because it is a file`);
      } else {
        const sub = entry.entries.find(e => e.name === pathSegment);
        if (!sub) {
          throw new Error(`${entry.name} does not have a subdirectory ${pathSegment}`);
        }

        return sub;
      }
    },
    fileSystem as Entry
  );
};
