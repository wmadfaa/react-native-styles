export type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

export type PartialExcept<T, K extends keyof T> = RecursivePartial<T> &
  Pick<T, K>;

export type RecursiveReadOnly<T> = {
  readonly [P in keyof T]: RecursiveReadOnly<T[P]>;
};
