/**
 * @param {*} o
 * @return {boolean}
 */
export function is_plain_object(o) {
  return typeof o === 'object' && !is_array(o) && o != null;
}

/**
 * @param {*} a
 * @return {boolean}
 */
export function is_array(a) {
  return Array.isArray(a);
}

/**
 * @param {*} fn
 * @return {boolean}
 */
export function is_function(fn) {
  return typeof fn === 'function';
}

/**
 * @param {*} str
 * @return {boolean}
 */
export function is_string(str) {
  return typeof str === 'string';
}

/**
 * @param {*} num
 * @return {boolean}
 */
export function is_number(num) {
  return typeof num === 'number';
}

/**
 * Iterates through all the object values
 * @param {object} o
 * @param {function} fn
 */
export function for_each(o, fn) {
  Object.entries(o).forEach(([k, v]) => fn(v, k));
}

/**
 * Return the size of an object or array.
 * @param {object|array} o
 * @return {*|number}
 */
export function size(o) {
  return is_array(o) ? o.length : keys(o).length;
}

/**
 * Map values of an object to its keys.
 * @param {object} o
 * @param {function|string} fn
 * @return {object}
 */
export function map_values(o, fn) {
  if (is_string(fn)) {
    fn = (item) => item[fn];
  }
  return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, fn(v, k)]));
}

/**
 * Map an object without preserving the keys.
 * @param {object} o
 * @param {function|string} fn
 * @return {array}
 */
export function map(o, fn) {
  return Object.values(map_values(o, fn));
}

/**
 * Reduce an object using its properties as keys.
 * @param {object} o
 * @param {function} fn
 * @param {*} initial
 * @return {*}
 */
export function reduce(o, fn, initial) {
  return Object.entries(o).reduce(
    (prev, [i, curr]) => fn(prev, curr, i),
    initial
  );
}

/**
 * @param {object} o
 * @return {string[]}
 */
export function keys(o) {
  return Object.keys(o);
}

/**
 * Return the first object that match.
 * @param {object} o
 * @param {object} where
 * @return {*}
 */
export function find(o, where) {
  const w = Object.entries(where);
  return Object.values(o).filter(
    (e) => w.length === w.filter(([k, v]) => e[k] === v).length
  )[0];
}

/**
 * @param {object} object
 * @param {string} key
 * @return {boolean|*}
 */
export function has(object, key) {
  return object != null && Object.prototype.hasOwnProperty.call(object, key);
}

/**
 * @param {array} array
 * @return {*}
 */
export function first(array) {
  return array != null && array.length ? array[0] : undefined;
}
