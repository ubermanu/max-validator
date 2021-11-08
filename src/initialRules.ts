import { isArray } from './util'
import { Rule } from './Rule'

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

export const alpha = new Rule(
  'alpha',
  (value: any) => /^[a-zA-Z]+$/.test(value),
  ':name can only contain letters'
)

export const alpha_dash = new Rule(
  'alpha_dash',
  (value: any) => /^[a-zA-Z0-9_\-]+$/.test(value),
  ':name can only contain letters, dashes and underscores'
)

export const alpha_numeric = new Rule(
  'alpha_numeric',
  (value: any) => /^[a-zA-Z0-9]+$/.test(value),
  ':name can only contain letters and digits'
)

export const array = new Rule(
  'array',
  (value: any) => isArray(value),
  ':name must be an array'
)

export const between = new Rule(
  'between',
  (value: any, from: any, to: any) => value >= from && value <= to,
  ':name must be between :from and :to'
)

export const boolean = new Rule(
  'boolean',
  (value: any) => typeof value === 'boolean',
  ':name must be a boolean'
)

export const checked = new Rule(
  'checked',
  (value: any) =>
    value === 1 || value === 'on' || value === true || value === 'true',
  ':name must be checked'
)

export const contains_all = new Rule(
  'contains_all',
  (value: any, ...values: any) => {
    if (!isArray(value)) {
      value = String(value)
    }
    for (let i = 0, l = values.length; i < l; i++) {
      if (value.indexOf(values[i]) === -1) {
        return { value_to_contain: values[i] }
      }
    }
    return true
  },
  ':name must contain all of ":value_to_contain"'
)

export const contains_one = new Rule(
  'contains_one',
  (value: any, ...values: any) => {
    if (!isArray(value)) {
      value = String(value)
    }
    for (let i = 0, l = values.length; i < l; i++) {
      if (value.indexOf(values[i]) > -1) {
        return true
      }
    }
  },
  ':name must contain one of ":value_to_contain"'
)

export const date = new Rule(
  'date',
  (value: any) => !isNaN(Date.parse(value)),
  ':name must be a valid date'
)

export const email = new Rule(
  'email',
  (value: any) => emailRegex.test(value),
  ':name must be a valid email'
)

export const ends_with = new Rule(
  'ends_with',
  (value: any, suffix: any) => value.endsWith(suffix),
  ':name must end with :suffix'
)

export const equals = new Rule(
  'equals',
  (value: any, param: any) => String(value) === String(param),
  ':name must equal to :value_to_equal'
)

export const in_array = new Rule(
  'in_array',
  (value: any, ...arr: any) => arr.includes(value),
  ':name is not in :value_to_contain'
)

export const ip = new Rule(
  'ip',
  (value: any) => ipRegex.test(value),
  ':name must be a valid IP address'
)

export const json = new Rule(
  'json',
  (value: any) => {
    try {
      JSON.parse(value)
      return true
    } catch (e) {
      return false
    }
  },
  ':name must be valid json'
)

export const max = new Rule(
  'max',
  (value: any, max: any) => value <= max,
  `:name can't be greater than :max`
)

export const min = new Rule(
  'min',
  (value: any, min: any) => value >= min,
  `:name can't be less than :min`
)

export const not_equals = new Rule(
  'not_equals',
  (value: any, param: any) => String(value) !== String(param),
  ":name can't be :value_to_not_equal"
)

export const not_in = new Rule(
  'not_in',
  (value: any, ...arr: any) => !arr.includes(value),
  ":name can't be :value_to_not_contain"
)

export const number = new Rule(
  'number',
  (value: any) => /^-?\d+$/.test(value),
  ':name must be a number'
)

export const numeric = number

export const phone = new Rule(
  'phone',
  (value: any) =>
    /^\d{7,}$/.test(String(value).replace(/[\s()+\-\.]|ext/gi, '')),
  ':name must be a valid phone number'
)

export const required = new Rule(
  'required',
  (value: any) => value !== undefined && value !== null,
  ':name is required'
)

export const starts_with = new Rule(
  'starts_with',
  (value: any, prefix: any) => value.startsWith(prefix),
  ':name must start with :prefix'
)

export const string = new Rule(
  'string',
  (value: any) => typeof value === 'string',
  ':name must be a string'
)

export const url = new Rule(
  'url',
  (value: any) => {
    try {
      new URL(value)
      return true
    } catch (e) {
      return { value }
    }
  },
  ':name must be a valid url'
)
