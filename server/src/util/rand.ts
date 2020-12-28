import { Iterator, iterate } from './iter';

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const pickRandom = (values: any[]) => values[getRandomInt(0, values.length - 1)];

export const randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'.split('');
export const getRandomChar = () => pickRandom(randomChars);

export const getRandomString = (len: number) => Array.from(Iterator.map((_) => getRandomChar(), iterate(len))).join('');
