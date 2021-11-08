# Rules

Here are the basic rules shipped in the framework:

```javascript
/**
 * Validates if given value is not empty
 * @message Parameter is required
 * @example ...'|required'
 */
'required';

/**
 * Validates if the value is a string
 * @example ...'|string'
 */
'string';

/**
 * Returns error if given value is greater than given parameter, if value is not numeric compares string length
 * @message Parameter cant be less than Value
 * @example ...'|min:20|'
 */
'min';

/**
 * Returns error if given value is less than given parameter, if value is not numeric compares string length
 * @message Parameter cant be greater than Value
 * @example ...'|max:20|'
 */
'max';

/**
 * Returns error if given value is between given parameter, if value is not numeric compares string length
 * @message Parameter must be between From and To
 * @example ...'|between:20,40|'
 */
'between';

/**
 * Validates if checkbox is checked. Valid values: `'on', 1, 'true', true`
 * @message Parameter must be checked
 * @example ...'|checked|'
 */
'checked';

/**
 * Validates if given value is object
 * @message Parameter must be object
 * @example ...'|object|'
 */
'object';

/**
 * Validates if given value is array
 * @message Parameter must be array
 * @example ...'|array|'
 */
'array';

/**
 * Validates if given value is boolean
 * @message Parameter must be boolean
 * @example ...'|boolean|'
 */
'boolean';

/**
 * Validates if given value is valid json
 * @message Parameter must be valid json
 * @example ...'|json|'
 */
'json';

/**
 * Validates if given value contains only digits and letters
 * @message Parameter can only contain digits and letters
 * @example ...'|alpha_numeric|'
 */
'alpha_numeric';

/**
 * Validates if given value contains only digits
 * @message Parameter can only contain numbers
 * @example ...'|numeric|'
 */
'numeric';

/**
 * Validates if given value contains only letters
 * @message Parameter can only contain leters
 * @example ...'|alpha|'
 */
'alpha';

/**
 * Validates if given value contains only letters and dashes
 * @message Parameter can only contain letters and dashes
 * @example ...'|alpha_dash|'
 */
'alpha_dash';

/**
 * Validates if given value is correct email
 * @message Parameter must be correct e-mail
 * @example ...'|email|'
 */
'email';

/**
 * Validates if given value is in given array
 * @message Parameter is invalid
 * @example ...'|in_array:1,2,a,b,c|'
 */
'in_array';

/**
 * Validates if given value is not in given array
 * @message Parameter cant be Value
 * @example ...'|not_in:1,2,a,b,c|'
 */
'not_in';

/**
 * Validates if given value is valid IP Address
 * @message Parameter must be valid ip adress
 * @example ...'|ip|'
 */
'ip';

/**
 * Validates if given value is valid URl
 * @message Parameter must be valid URL
 * @example ...'|url|'
 */
'url';

/**
 * Validates if given value equals to given parameter
 * @message Parameter must equal to Value
 * @example ...'|equals:foo|'
 */
'equals';

/**
 * Validates if given value don't equals to given parameter
 * @message Parameter can't be Value
 * @example ...'|not_equals:foo|'
 */
'not_equals';

/**
 * Validates if given value don't contains one of parameter
 * @message Parameter must contain "Value"
 * @example ...'|contains_one:foo,bar,2|'
 */
'contains_one';

/**
 * Validates if given value don't contains every given parameter
 * @message Parameter must contain "Value"
 * @example ...'|contains_all:foo,bar,2|'
 */
'contains_all';

/**
 * Validates if given value starts with given prefix
 * @message Parameter must start with Value
 * @example ...'|starts_with:foo|'
 */
'starts_with';

/**
 * Validates if given value ends with given suffix
 * @message Parameter must end with Value
 * @example ...'|ends_with:foo|'
 */
'ends_with';

/**
 * Validates if given value is valid date
 * @message Parameter must be valid date
 * @example ...'|date|'
 */
'date';
```
