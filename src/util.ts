export function isPlainObject(o: any): boolean {
  return typeof o === 'object' && !isArray(o) && o != null
}

export function isArray(a: any): boolean {
  return Array.isArray(a)
}

export function isFunction(fn: any): boolean {
  return typeof fn === 'function'
}

export function isString(str: any): boolean {
  return typeof str === 'string'
}

export function size(o: any): number {
  return isArray(o) ? o.length : keys(o).length
}

export function mapValues(o: any, fn: any) {
  if (isString(fn)) {
    fn = (item: any) => item[fn]
  }
  return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, fn(v, k)]))
}

export function reduce(o: any, fn: any, initial: any) {
  return Object.entries(o).reduce((prev, [i, curr]) => fn(prev, curr, i), initial)
}

export function keys(o: object): string[] {
  return Object.keys(o)
}

export function has(object: object, key: string): boolean {
  return object != null && Object.prototype.hasOwnProperty.call(object, key)
}

export function first(array: any[]): any {
  if (isPlainObject(array)) {
    array = Object.values(array)
  }
  return array != null && array.length ? array[0] : undefined
}
