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

export function isNumber(num: any): boolean {
  return typeof num === 'number'
}

export function forEach(o: any[], fn: Function) {
  return Object.entries(o).forEach(([k, v]) => fn(v, k))
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

export function map(o: any, fn: any) {
  return Object.values(mapValues(o, fn))
}

export function reduce(o: any, fn: any, initial: any) {
  return Object.entries(o).reduce(
    (prev, [i, curr]) => fn(prev, curr, i),
    initial
  )
}

export function keys(o: object): string[] {
  return Object.keys(o)
}

export function find(o: object, where: any[]) {
  const w = Object.entries(where)
  return first(
    Object.values(o).filter(
      (e) => w.length === w.filter(([k, v]) => e[k] === v).length
    )
  )
}

export function has(object: object, key: string): boolean {
  return object != null && Object.prototype.hasOwnProperty.call(object, key)
}

export function first(array: any[]): any {
  return array != null && array.length ? array[0] : undefined
}
