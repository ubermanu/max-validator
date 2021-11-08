import {
  forEach,
  isArray,
  isFunction,
  isPlainObject,
  isString,
  mapValues,
} from './util'
import * as initialRules from './initialRules'
import { Rule } from './Rule'

let anonymousIndex = 0

// TODO: Values must be rules
export interface Ruleset {
  [key: string]: Function
}

export class RulesetParser {
  ruleSeparator = '|'
  ruleParamSeparator = ':'
  paramsSeparator = ','
  rules: Map<string, Rule> = new Map()

  constructor() {
    for (let k in initialRules) {
      // @ts-ignore
      this.rules.set(k, initialRules[k])
    }
  }

  public addRule(rule: Rule): this {
    if (this.rules.has(rule.name)) {
      throw new Error(`The validation method "${rule.name}" already exists`)
    }
    this.rules.set(rule.name, rule)
    return this
  }

  public setRuleSeparator(separator: string): this {
    this.ruleSeparator = separator
    return this
  }

  public setRuleParamSeparator(separator: string): this {
    this.ruleParamSeparator = separator
    return this
  }

  public setParamsSeparator(separator: string): this {
    this.paramsSeparator = separator
    return this
  }

  public parse(config: object): Ruleset[] {
    // @ts-ignore
    return mapValues(config, (definitions: any, prop: string) => {
      if (isString(definitions)) {
        return this.parseStringDefinitions(definitions)
      } else if (isArray(definitions)) {
        return this.parseArrayDefinitions(definitions)
      } else if (isPlainObject(definitions)) {
        return this.parseObjectDefinitions(definitions)
      }
      throw new Error(`Invalid rules for ${prop}`)
    })
  }

  /**
   * @example ['required', 'max:20', fn() => {}]
   */
  protected parseArrayDefinitions(config: any[]): Ruleset {
    const ruleset: Ruleset = {}

    forEach(config, (definition: any) => {
      if (isString(definition)) {
        Object.assign(ruleset, this.parseStringDefinitions(definition))
      } else if (isFunction(definition)) {
        ruleset[`anonymous_${anonymousIndex++}`] = definition
      } else {
        throw new Error(
          `Couldn't parse the schema, unsupported rule type: ${typeof definition}`
        )
      }
    })

    return ruleset
  }

  /**
   * @example {required: true, in_array: [1, 2, 3, 4, 5] ... , fn() => {}}
   */
  protected parseObjectDefinitions(config: object): Ruleset {
    let ruleset: Ruleset = {}

    forEach(config, (definition: any, name: string) => {
      if (isFunction(definition)) {
        ruleset[name] = (value: any) => definition(value)
      } else {
        const args = isArray(definition) ? definition : [definition]
        const fn = this.getRuleFunction(name)
        ruleset[name] = (value: any) => fn(value, ...args)
      }
    })

    return ruleset
  }

  /**
   * @example 'required|min:1|max:20'
   */
  protected parseStringDefinitions(config: string): Ruleset {
    const defs = config.split(this.ruleSeparator).filter((v) => v)
    const ruleset: Ruleset = {}

    forEach(defs, (definition: string) => {
      const parts = definition.split(this.ruleParamSeparator)
      const name = parts[0].trim()
      const fn = this.getRuleFunction(name)
      const args = isString(parts[1])
        ? parts[1].split(this.paramsSeparator)
        : []
      ruleset[name] = (value: any) => fn(value, ...args)
    })

    return ruleset
  }

  protected getRuleFunction(name: string) {
    if (!this.rules.has(name)) {
      throw new Error(`The validation method "${name}" does not exist`)
    }
    return this.rules.get(name).method
  }
}
