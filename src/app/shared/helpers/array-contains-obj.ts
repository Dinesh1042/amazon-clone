import { isSameObj } from './is-same-obj';

export function arrayContainsObj<T>(
  arr: T[],
  obj: any // TODO: Solve the issue of any keyword
): boolean {
  return arr.some((val) => isSameObj(val, obj));
}
