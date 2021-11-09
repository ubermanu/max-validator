import { Rule } from './Rule'
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
      forEach(checks, (rule: Rule) => {
        if (rule.test(model[field])) {
          return
        } else {
          validation.addError(field, rule.getName(), rule.getErrorMessage(field))
        }
      })
    })

    return validation
  }
}
