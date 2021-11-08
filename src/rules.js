import { has, is_array, is_plain_object, is_string, size } from './util';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export let functions = {
  /**
   * @param value
   * @return {boolean|{value}}
   */
  alpha(value) {
    return /^[a-zA-Z]+$/.test(value) || { value };
  },

  /**
   * @param value
   * @return {boolean|{value}}
   */
  alpha_dash(value) {
    return /^[A-Za-z\-]+$/.test(value) || { value };
  },

  /**
   * @param value
   * @return {boolean|{value}}
   */
  alpha_numeric(value) {
    return /^[A-Za-z0-9]+$/.test(value) || { value };
  },

  /**
   * @param value
   * @return {boolean|{}}
   */
  array(value) {
    return is_array(value) || {};
  },

  /**
   * @param value
   * @param from
   * @param to
   * @return {{from, to, value}|boolean}
   */
  between(value, from, to) {
    if (is_string(value)) {
      value = value.length;
    }
    return (value >= from && value <= to) || { from, to, value };
  },

  /**
   * @param value
   * @return {boolean}
   */
  boolean(value) {
    return typeof value === 'boolean' || {};
  },

  /**
   * @param value
   * @return {boolean}
   */
  checked(value) {
    return (
      value === 1 || value === 'on' || value === true || value === 'true' || {}
    );
  },

  /**
   * @param value
   * @param values
   * @return {{value_to_contain: *}|boolean}
   */
  contains_all(value, ...values) {
    if (!is_array(value)) {
      value = String(value);
    }
    for (let i = 0, l = values.length; i < l; i++) {
      if (value.indexOf(values[i]) === -1) {
        return { value_to_contain: values[i] };
      }
    }
    return true;
  },

  /**
   * @param value
   * @param values
   * @return {boolean|{value_to_contain: string}}
   */
  contains_one(value, ...values) {
    if (!is_array(value)) {
      value = String(value);
    }
    for (let i = 0, l = values.length; i < l; i++) {
      if (value.indexOf(values[i]) > -1) {
        return true;
      }
    }
    return { value_to_contain: values.join(',') };
  },

  /**
   * @param value
   * @return {boolean}
   */
  date(value) {
    return !isNaN(Date.parse(value)) || {};
  },

  /**
   * @param value
   * @return {boolean|{value}}
   */
  email(value) {
    return emailRegex.test(value) || { value };
  },

  /**
   * @param value
   * @return {boolean|{value}}
   */
  phone(value) {
    value = String(value);
    return /^\d{7,}$/.test(value.replace(/[\s()+\-\.]|ext/gi, '')) || { value };
  },

  /**
   * @param value
   * @param suffix
   * @return {boolean|{suffix: string}}
   */
  ends_with(value, suffix) {
    suffix = String(suffix);
    value = String(value);
    return (
      value.indexOf(suffix, value.length - suffix.length) !== -1 || { suffix }
    );
  },

  /**
   * @param value
   * @param param
   * @return {boolean|{value}}
   */
  equals(value, param) {
    return String(value) === String(param) || { value: param };
  },

  /**
   * @param value
   * @param arr
   * @return {boolean|{value: string}}
   */
  in_array(value, ...arr) {
    return arr.indexOf(String(value)) > -1 || { value: arr.join(',') };
  },

  /**
   * @param value
   * @return {boolean|{value}}
   */
  ip(value) {
    return ipRegex.test(value) || { value };
  },

  /**
   * @param value
   * @return {{}|boolean}
   */
  json(value) {
    try {
      JSON.parse(String(value));
      return true;
    } catch (e) {
      return {};
    }
  },

  /**
   * @param value
   * @param max
   * @return {{max}|boolean}
   */
  max(value, max) {
    return (is_string(value) ? value.length : value) <= max || { max };
  },

  /**
   * @param value
   * @param min
   * @return {{min}|boolean}
   */
  min(value, min) {
    return (is_string(value) ? value.length : value) >= min || { min };
  },

  /**
   * @param value
   * @param param
   * @return {boolean|{value}}
   */
  not_equals(value, param) {
    return String(value) !== String(param) || { value: param };
  },

  /**
   * @param value
   * @param arr
   * @return {boolean|{value}}
   */
  not_in(value, ...arr) {
    return arr.indexOf(String(value)) === -1 || { value };
  },

  /**
   * @param value
   * @return {boolean|{value}}
   */
  numeric(value) {
    return /^-?\d+$/.test(value) || { value };
  },

  /**
   * @param value
   * @return {boolean|{value}}
   */
  object(value) {
    return is_plain_object(value) || { value };
  },

  /**
   * @param value
   * @return {boolean|{value}}
   */
  required(value) {
    if (typeof value === 'object' && value != null) {
      return size(value) > 0 || { value };
    }
    return ![undefined, null, false, ''].includes(value) || { value };
  },

  /**
   * @param value
   * @param prefix
   * @return {boolean|{prefix: string}}
   */
  starts_with(value, prefix) {
    prefix = String(prefix);
    value = String(value);
    return value.indexOf(prefix) === 0 || { prefix };
  },

  /**
   * @param value
   * @return {boolean|{value}}
   */
  string(value) {
    return is_string(value) || { value };
  },

  /**
   * @param value
   * @return {{value}|boolean}
   */
  url(value) {
    try {
      new URL(value);
      return true;
    } catch (e) {
      return { value };
    }
  },
};

/**
 * @param {string} name
 * @returns {function}
 */
export function getRuleFunction(name) {
  if (!has(functions, name)) {
    throw `The validation method "${name}" does not exist`;
  }
  return functions[name];
}
