
export const Iterator = {
  map: <T, U>(fn: (v: T) => U, iterator: Iterable<T>) => function* () {
    for (const value of iterator) {
      yield fn(value);
    }
  }()
};

export function* iterate(times: number) {
  for (let i = 0; i < times; i++) {
    yield i;
  }
};
