import { Validation } from './Validation'
import { forEach, has, isFunction, isPlainObject, isString } from './util'
import { Ruleset } from './RulesetParser'

export class Schema {
  ruleset: Ruleset[]

  constructor(ruleset: Ruleset[]) {
    this.ruleset = ruleset
  }

  validate(object: Object): Validation {
    const validation = new Validation()
    // TODO: Iterate through each the schema rules and add it to the validation object

    // forEach(object, (k: any, v: any) => {})
    //
    // const errors = {}
    // const rules = parseScheme(scheme)
    //
    // forEach(rules, (checks, propName) => {
    //   forEach(checks, (checkFunction, ruleName) => {
    //     let result = checkFunction(data[propName])
    //
    //     if (result === true) {
    //       return
    //     }
    //
    //     let err
    //     if (isString(result)) {
    //       err = result
    //     } else if (isPlainObject(result)) {
    //       err = formatMessage(ruleName, { name: propName, ...result })
    //     }
    //
    //     if (!has(errors, propName)) {
    //       errors[propName] = []
    //     }
    //
    //     errors[propName].push({
    //       propName,
    //       ruleName,
    //       err,
    //     })
    //   })
    // })
    //
    // const helper = getValidationResult(errors)
    //
    // if (isFunction(callback)) {
    //   callback(helper)
    // }
    //
    // return helper

    return validation
  }
}
