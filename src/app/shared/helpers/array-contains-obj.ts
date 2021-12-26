export function arrayContainsObj<T>(
  arr: T[],
  obj: any // TODO: Solve the issue of any keyword
): boolean {
  return (
    arr.some((val) =>
      Object.entries(val).every(([key, value]) => obj[key] === value)
    ) && arr.every((val) => Object.keys(val).length === Object.keys(obj).length)
  );
}
