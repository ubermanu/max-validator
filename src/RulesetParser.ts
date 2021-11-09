import { forEach, isArray, isFunction, isPlainObject, isString, mapValues } from './util'
import * as functions from './functions'
import { Rule } from './Rule'

let anonymousIndex = 0

export interface RulesetInterface {
  [key: string]: any
}

export class RulesetParser {
  ruleSeparator = '|'
  ruleParamSeparator = ':'
  paramsSeparator = ','
  defaultMessage: string = 'Invalid value'
  rules: Map<string, Rule> = new Map()

  constructor() {
    for (let name in functions) {
      const rule = new Rule(name, functions[name])
      this.rules.set(name, rule)
    }
  }

  public addRule(rule: Rule): this {
    if (this.rules.has(rule.getName())) {
      throw new Error(`The validation method "${rule.getName()}" already exists`)
    }
    this.rules.set(rule.getName(), rule)
    return this
  }

  public setDefaultMessage(message: string): this {
    this.defaultMessage = message
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

  public parse(config: RulesetInterface): Rule[][] {
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
  protected parseArrayDefinitions(config: any[]): Rule[] {
    let rules: Rule[] = []

    forEach(config, (definition: any) => {
      if (isString(definition)) {
        rules = rules.concat(this.parseStringDefinitions(definition))
      } else if (isFunction(definition)) {
        const rule = new Rule(`anonymous_${anonymousIndex++}`, (value: any) => definition(value) || this.defaultMessage)
        rules.push(rule.configure())
      } else {
        throw new Error(`Couldn't parse the schema, unsupported rule type: ${typeof definition}`)
      }
    })

    return rules
  }

  /**
   * @example {required: true, in_array: [1, 2, 3, 4, 5] ... , fn() => {}}
   */
  protected parseObjectDefinitions(config: object): Rule[] {
    let rules: Rule[] = []

    forEach(config, (definition: any, name: string) => {
      if (isFunction(definition)) {
        const rule = new Rule(name, (value: any) => definition(value) || this.defaultMessage)
        rules.push(rule.configure())
      } else {
        const args = isArray(definition) ? definition : [definition]
        const rule = this.getRule(name)
        rules.push(rule.configure(args))
      }
    })

    return rules
  }

  /**
   * @example 'required|min:1|max:20'
   */
  protected parseStringDefinitions(config: string): Rule[] {
    const defs = config.split(this.ruleSeparator).filter((v) => v)
    const rules: Rule[] = []

    forEach(defs, (definition: string) => {
      const parts = definition.split(this.ruleParamSeparator)
      const name = parts[0].trim()
      const rule = this.getRule(name)
      const args = isString(parts[1]) ? parts[1].split(this.paramsSeparator) : []
      rules.push(rule.configure(args))
    })

    return rules
  }

  protected getRule(name: string) {
    if (!this.rules.has(name)) {
      throw new Error(`The validation method "${name}" does not exist`)
    }
    return this.rules.get(name)
  }
}
