import { isArray, isPlainObject, size } from './util'

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const ipRegex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const phoneRegex = /^\+?[0-9]{1,3}\s?\(?[0-9]{3}\)?\s?[0-9]{3}\s?[0-9]{4}$/
const urlRegex =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

export const alpha = function (value: any) {
  return /^[a-zA-Z]+$/.test(value) || '%0 can only contain letters'
}

export const alpha_dash = function (value: any) {
  return /^[a-zA-Z\-_]+$/.test(value) || '%0 can only contain letters, dashes and underscores'
}

export const alpha_numeric = function (value: any) {
  return /^[a-zA-Z0-9]+$/.test(value) || '%0 can only contain letters and numbers'
}

export const array = function (value: any) {
  return isArray(value) || '%0 must be an array'
}

export const between = function (value: any, min: number, max: number) {
  return (size(value) >= min && size(value) <= max) || `%0 must be between %1 and %2`
}

export const boolean = function (value: any) {
  return typeof value === 'boolean' || '%0 must be a boolean'
}

export const checked = function (value: any) {
  return value === 1 || value === 'on' || value === true || value === 'true' || '%0 must be checked'
}

export const contains_all = function (value: any, ...array: any) {
  if (!isArray(value)) {
    value = String(value)
  }
  for (let i = 0, l = array.length; i < l; i++) {
    if (value.indexOf(array[i]) === -1) {
      return '%0 must contain all of the following: %%'
    }
  }
  return true
}

export const contains_one = function (value: any, ...array: any) {
  if (!isArray(value)) {
    value = String(value)
  }
  for (let i = 0, l = array.length; i < l; i++) {
    if (value.indexOf(array[i]) > -1) {
      return true
    }
  }
  return '%0 must contain at least one of the following: %%'
}

export const date = function (value: any) {
  return !isNaN(Date.parse(value)) || '%0 must be a valid date'
}

export const email = function (value: any) {
  return emailRegex.test(value) || '%0 must be a valid email address'
}

export const ends_with = function (value: any, suffix: any) {
  return value.endsWith(suffix) || '%0 must end with %1'
}

export const equals = function (value: any, param: any) {
  return String(value) === String(param) || '%0 must equal %1'
}

export const in_array = function (value: any, ...array: any) {
  return array.includes(value) || '%0 must be one of the following: %%'
}

export const ip = function (value: any) {
  return ipRegex.test(value) || '%0 must be a valid IP address'
}

export const json = function (value: any) {
  try {
    JSON.parse(value)
    return true
  } catch (e) {
    return '%0 must be valid JSON'
  }
}

export const max = function (value: any, max: number) {
  return size(value) <= max || `%0 must be less than %1`
}

export const min = function (value: any, min: number) {
  return size(value) >= min || `%0 must be greater than %1`
}

export const not_equals = function (value: any, param: any) {
  return String(value) !== String(param) || '%0 must not equal %1'
}

export const not_in = function (value: any, ...array: any) {
  return !array.includes(value) || '%0 must not be one of the following: %%'
}

export const number = function (value: any) {
  return typeof value === 'number' || '%0 must be a number'
}

export const numeric = number

export const object = function (value: any) {
  return isPlainObject(value) || '%0 must be an object'
}

export const optional = function (value: any) {
  return required(value) !== true
}

export const phone = function (value: any) {
  return phoneRegex.test(value) || '%0 must be a valid phone number'
}

export const required = function (value: any) {
  return (value !== undefined && value !== null && value !== false && value !== '') || '%0 is required'
}

export const starts_with = function (value: any, prefix: any) {
  return value.startsWith(prefix) || '%0 must start with %1'
}

export const string = function (value: any) {
  return typeof value === 'string' || '%0 must be a string'
}

export const url = function (value: any) {
  return urlRegex.test(value) || '%0 must be a valid URL'
}
