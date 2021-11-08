import {
  find,
  first,
  forEach,
  has,
  isFunction,
  isPlainObject,
  isString,
  map,
  mapValues,
  size,
} from './util';
import { formatMessage, messages } from './messages';
import { functions } from './rules';
import { parseScheme } from './scheme';

export { setMessages, setDefaultMessage } from './messages';
export {
  setRuleSeparator,
  setRuleParamSeparator,
  setParamsSeparator,
} from './scheme';

/**
 * Extends `Validator` by adding new validation methods.
 *
 * @param {string} name
 * @param {function} method
 * @param {string|null} message
 */
export function extend(name, method, message = null) {
  if (has(functions, name)) {
    throw `The validation method "${name}" already exists`;
  }

  if (!isFunction(method)) {
    throw `The validation method must be a function, type given: ${typeof method}`;
  }

  functions[name] = method;

  if (message) {
    messages[name] = message;
  }
}

/**
 * Validate given data with given rules
 *
 * @param {object} data Data to validate
 * @param {object} scheme Validation scheme
 * @param {function?} callback
 * @returns {object}
 */
export function validate(data, scheme, callback = null) {
  if (!isPlainObject(data) || !isPlainObject(scheme)) {
    throw 'Both data and scheme must be plain objects';
  }

  const errors = {};
  const rules = parseScheme(scheme);

  forEach(rules, (checks, propName) => {
    forEach(checks, (checkFunction, ruleName) => {
      let result = checkFunction(data[propName]);

      if (result === true) {
        return;
      }

      let err;
      if (isString(result)) {
        err = result;
      } else if (isPlainObject(result)) {
        err = formatMessage(ruleName, { name: propName, ...result });
      }

      if (!has(errors, propName)) {
        errors[propName] = [];
      }

      errors[propName].push({
        propName,
        ruleName,
        err,
      });
    });
  });

  const helper = getValidationResult(errors);

  if (isFunction(callback)) {
    callback(helper);
  }

  return helper;
}

/**
 * Get empty result object (used for placeholder)
 * @return {object}
 */
export function getEmpty() {
  return validate({}, {});
}

/**
 * Get the result object from the `validate()` function.
 * Contains the errors and helpers.
 *
 * @param {object} errors
 * @returns {object}
 */
function getValidationResult(errors) {
  return {
    /**
     * @type {boolean}
     */
    hasError: size(errors) > 0,

    /**
     * A map with the error messages for each properties.
     *
     * @type {Object}
     */
    errors: mapValues(errors, (e) => map(e, 'err')),

    /**
     * Returns TRUE if the property has an error.
     *
     * @param {string} propName
     * @param {string|*} ruleName
     * @return {boolean}
     */
    isError(propName, ruleName = null) {
      return (
        has(errors, propName) &&
        (!ruleName || find(errors[propName], { ruleName }) !== undefined)
      );
    },

    /**
     * Returns the error messages for a property.
     *
     * @param {string} propName
     * @param {boolean} all
     * @return {string|*}
     */
    getError(propName, all = false) {
      if (!has(errors, propName) || size(errors[propName]) === 0) {
        return '';
      }

      return all
        ? map(errors[propName], 'err').join(', ')
        : first(errors[propName]).err;
    },
  };
}
