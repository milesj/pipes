import isObject from './isObject';

export default function deepFreeze<T extends object = object>(obj: T): T {
  if (Object.isFrozen(obj)) {
    return obj as T;
  }

  const nextObj: { [key: string]: unknown } = {};

  Object.entries(obj).forEach(([key, value]) => {
    // Only freeze plain objects
    if (isObject(value) && value.constructor === Object) {
      nextObj[key] = deepFreeze(value);
    } else {
      nextObj[key] = value as unknown;
    }
  });

  return Object.freeze(nextObj) as T;
}
