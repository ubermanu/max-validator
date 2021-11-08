import { Schema } from './Schema'
import { RulesetParser } from './RulesetParser'
import { Rule } from './Rule'

export class Validator {
  schema: Schema
  defaultMessage: string = 'Invalid value'
  rulesetParser: RulesetParser = new RulesetParser()

  constructor(schema: object = null) {
    if (schema !== null) {
      this.setSchema(schema)
    }
  }

  public extend(name: string, method: Function, errorMessage: string = null) {
    const rule = new Rule(name, method, errorMessage || this.defaultMessage)
    this.rulesetParser.addRule(rule)
    return this
  }

  public setSchema(schema: object) {
    const ruleset = this.rulesetParser.parse(schema)
    this.schema = new Schema(ruleset)
    return this
  }

  public validate(object: object) {
    return this.schema.validate(object)
  }

  public setDefaultMessage(message: string) {
    this.defaultMessage = message
    return this
  }

  public setMessages(messages: object) {
    console.warn('Validator.setMessages is deprecated.')
    return this
  }

  public setRuleSeparator(separator: string) {
    this.rulesetParser.setRuleSeparator(separator)
    return this
  }

  public setRuleParamSeparator(separator: string) {
    this.rulesetParser.setRuleParamSeparator(separator)
    return this
  }

  public setParamsSeparator(separator: string) {
    this.rulesetParser.setParamsSeparator(separator)
    return this
  }
}
