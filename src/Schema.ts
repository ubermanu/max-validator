import { ConfiguredRule } from './Rule'
import { Validation } from './Validation'
import { optional } from './functions'

export class Schema {
  ruleset: ConfiguredRule[][]

  constructor(ruleset: ConfiguredRule[][]) {
    this.ruleset = ruleset
  }

  /**
   * Validate the given data against the schema.
   */
  public validate(model: object): Validation {
    const validation = new Validation()
    let required

    for (let field in this.ruleset) {
      const rules = this.ruleset[field]
      required = !optional(model[field])

      for (let j = 0, m = rules.length; j < m; j++) {
        const rule: ConfiguredRule = rules[j]
        const res = rule.validate(field, model[field])

        // Set the `required` flag to true if the field is required.
        if (rule.getName() === 'required') {
          required = true
          if (res !== true) {
            validation.addError(field, rule.getName(), res)
          }
          continue
        }

        // Set the `required` flag to false if the field is optional.
        if (rule.getName() === 'optional' && res === true) {
          required = false
          continue
        }

        if (required && res !== true) {
          validation.addError(field, rule.getName(), res)
        }
      }
    }

    return validation
  }
}
