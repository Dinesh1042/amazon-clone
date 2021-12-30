// Comparing is that both are same object

export function isSameObj(obj1: Obj, obj2: Obj) {
  return (
    Object.entries(obj1).every(([key, value]) => obj2[key] === value) &&
    Object.keys(obj1).length === Object.keys(obj2).length
  );
}

interface Obj {
  [key: string]: any;
}
