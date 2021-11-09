import { Schema } from './Schema'
import { RulesetInterface, RulesetParser } from './RulesetParser'
import { Rule } from './Rule'

export class Validator {
  schema: Schema = null
  rulesetParser: RulesetParser = new RulesetParser()

  constructor(schema: RulesetInterface = null) {
    if (schema !== null) {
      this.setSchema(schema)
    }
  }

  public extend(name: string, method: Function, errorMessage: string = null) {
    const rule = new Rule(name, method, errorMessage)
    this.rulesetParser.addRule(rule)
    return this
  }

  public setSchema(schema: RulesetInterface) {
    const ruleset = this.rulesetParser.parse(schema)
    this.schema = new Schema(ruleset)
    return this
  }

  public validate(object: object) {
    return this.schema.validate(object)
  }

  public setDefaultMessage(message: string) {
    this.rulesetParser.setDefaultMessage(message)
    return this
  }

  // TODO: Add a method to update the message of any initial rule
  // TODO: Add support for localization
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
