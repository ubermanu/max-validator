import { reduce } from './util'

export class Rule {
  protected name: string
  protected method: Function
  protected errorMessage: string = null

  constructor(name: string, method: Function, errorMessage: string = '') {
    this.name = name
    this.method = method
    this.errorMessage = errorMessage
  }

  public getName() {
    return this.name
  }

  /**
   * Return the error message formatted with the rule's params.
   * The first param should be the name of the field (e.g. 'name' or 'age').
   */
  public formatErrorMessage(params: any[]): string {
    return reduce(params, (m: any, val: any, key: any) => m.replace(`%${key}`, val), this.errorMessage)
  }

  /**
   * Returns TRUE if the rule passes.
   */
  public test(value: any, ...params: any): boolean {
    return this.method(value, ...params) === true
  }

  /**
   * Return a copy of the rule, configured to work with specific params.
   * This is useful when you want to use the same rule for multiple fields.
   */
  public configure(params: any[] = []): ConfiguredRule {
    return new ConfiguredRule(this.name, this.method, params, this.errorMessage)
  }
}

/**
 * A rule that has been configured with specific params.
 * Now contains a new method: `validate` that will return the error message if any.
 * TODO: Might be overkill to keep this class.
 */
export class ConfiguredRule extends Rule {
  protected params: any[] = []

  /**
   * Note: The rule's method now handle 2 arguments: the field name and the value.
   */
  constructor(name: string, method: Function, params: any[] = [], errorMessage: string = '') {
    super(name, method, errorMessage)
    this.params = params
    this.method = (field, value) => method(value, ...params) || this.formatErrorMessage([field, ...params])
  }

  /**
   * Returns TRUE if the rule passes.
   * The field name is not known at this point, so we pass null.
   */
  public test(value: any): boolean {
    return this.method(null, value) === true
  }

  /**
   * Return itself, configured to work with specific params.
   */
  public configure(params: any[] = []): this {
    console.warn('You cannot configure a rule more than once.')
    return this
  }

  /**
   * Execute the rule's method and return the result.
   */
  public validate(field: string, value: any): any {
    return this.method(field, value)
  }
}
