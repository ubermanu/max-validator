import { Validation } from './Validation'
import { forEach } from './util'
import { Ruleset } from './RulesetParser'

export class Schema {
  ruleset: Ruleset[]

  constructor(ruleset: Ruleset[]) {
    this.ruleset = ruleset
  }

  validate(data: object): Validation {
    const validation = new Validation()

    forEach(this.ruleset, (checks: any, propName: string) => {
      forEach(checks, (checkFunction: Function, ruleName: string) => {
        // @ts-ignore
        const result = checkFunction(data[propName])
        if (result === true) {
          return
        }
        validation.addError(propName, ruleName, new Error('Error'))
      })
    })

    return validation
  }
}
