import { reduce } from './util'

export class Rule {
  protected name: string
  protected method: Function

  constructor(name: string, method: Function) {
    this.name = name
    this.method = method
  }

  public getName(): string {
    return this.name
  }

  /**
   * Return the error message formatted with the rule's params.
   * The first param should be the name of the field (e.g. 'name' or 'age').
   * The `%%` placeholder will be replaced with a comma separated list of params (except the first one).
   */
  public formatErrorMessage(message: string, params: any[]): string {
    return reduce(params, (m: any, val: any, key: any) => m.replace(`%${key}`, val), message).replace(
      '%%',
      params.slice(1).join(', ')
    )
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
    return new ConfiguredRule(this.name, this.method, params)
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
  constructor(name: string, method: Function, params: any[] = []) {
    super(name, method)
    this.params = params
    this.method = (field, value) => {
      const res = method(value, ...params)
      if (typeof res === 'string') {
        return this.formatErrorMessage(res, [field, ...params])
      }
      return !!res
    }
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
  public configure(): this {
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
