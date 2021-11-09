import { ConfiguredRule, Rule } from './Rule'
import { Validation } from './Validation'
import { forEach } from './util'

export class Schema {
  ruleset: Rule[][]

  constructor(ruleset: Rule[][]) {
    this.ruleset = ruleset
  }

  /**
   * Validate the given data against the schema.
   */
  public validate(model: object): Validation {
    const validation = new Validation()

    forEach(this.ruleset, (checks: any, field: string) => {
      forEach(checks, (rule: ConfiguredRule) => {
        const res = rule.validate(field, model[field])
        if (res === true) {
          return
        } else {
          validation.addError(field, rule.getName(), res)
        }
      })
    })

    return validation
  }
}
