import { Validation } from './Validation'
import { forEach } from './util'
import { Rule } from './Rule'

export class Schema {
  ruleset: Rule[][]

  constructor(ruleset: Rule[][]) {
    this.ruleset = ruleset
  }

  /**
   * Validate the given data against the schema.
   */
  public validate(data: object): Validation {
    const validation = new Validation()

    forEach(this.ruleset, (checks: any, propName: string) => {
      forEach(checks, (rule: Rule) => {
        // @ts-ignore
        if (rule.test(data[propName])) {
          return
        } else {
          validation.addError(propName, rule.getName(), rule.getErrorMessage())
        }
      })
    })

    return validation
  }
}
