import {
  for_each,
  is_array,
  is_function,
  is_plain_object,
  is_string,
  map_values,
} from './util';
import { getRuleFunction } from './rules';

export let ruleSeparator = '|';
export let ruleParamSeparator = ':';
export let paramsSeparator = ',';

/**
 * Override default rule separator
 * @param {string} separator
 */
export function setRuleSeparator(separator) {
  if (!is_string(separator)) {
    throw 'Separator must be string';
  }
  ruleSeparator = separator;
}

/**
 * Override default rule-params separator
 * @param {string} separator
 */
export function setRuleParamSeparator(separator) {
  if (!is_string(separator)) {
    throw 'Separator must be string';
  }
  ruleParamSeparator = separator;
}

/**
 * Override default params separator
 * @param {string} separator
 */
export function setParamsSeparator(separator) {
  if (!is_string(separator)) {
    throw 'Separator must be string';
  }
  paramsSeparator = separator;
}

/**
 * Parse a complete scheme of rules.
 * Can contains arrays, objects and strings.
 *
 * @param {{}} scheme
 * @return {{}} Parsed rules
 */
export function parseScheme(scheme) {
  return map_values(scheme, (config, propName) => {
    if (is_string(config)) {
      return parseStringRules(config);
    }

    if (is_array(config)) {
      return parseArrayRules(config);
    }

    if (is_plain_object(config)) {
      return parseObjectRules(config);
    }

    throw `Invalid rules for ${propName}`;
  });
}

/**
 * @example ['required', 'max:20', fn() => {}]
 * @param {array} config
 * @return {object}
 */
function parseArrayRules(config) {
  const rules = {};
  let i = 0;

  for_each(config, (rule) => {
    if (is_string(rule)) {
      Object.assign(rules, parseStringRules(rule));
    } else if (is_function(rule)) {
      rules[`anonymous_${i++}`] = rule;
    } else {
      throw `Couldn't parse the scheme, unsupported rule type: ${typeof rule}`;
    }
  });

  return rules;
}

/**
 * @example {required: true, in_array: [1, 2, 3, 4, 5] ... , fn() => {}}
 * @param {object} config
 * @return {object}
 */
function parseObjectRules(config) {
  const rules = {};

  for_each(config, (option, name) => {
    if (is_function(option)) {
      rules[name] = (value) => option(value);
    } else {
      const args = is_array(option) ? option : [option];
      const fn = getRuleFunction(name);
      rules[name] = (value) => fn(value, ...args);
    }
  });

  return rules;
}

/**
 * @example 'required|min:1|max:20'
 * @param {string} config
 * @return {object}
 */
function parseStringRules(config) {
  const defs = config.split(ruleSeparator).filter((v) => v);
  const rules = {};

  for_each(defs, (data) => {
    const parts = data.split(ruleParamSeparator);
    const name = parts[0].trim();
    const fn = getRuleFunction(name);
    const args = is_string(parts[1]) ? parts[1].split(paramsSeparator) : [];
    rules[name] = (value) => fn(value, ...args);
  });

  return rules;
}
