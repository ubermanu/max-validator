import { reduce } from './util'

export class Rule {
  name: string
  method: Function
  errorMessage: string = null

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
   * Note: The rule's method now handle 2 arguments: the field name and the value.
   */
  public configure(params: any = []) {
    const method = (field, value) => this.method(value, ...params) || this.formatErrorMessage([field, ...params])
    return new Rule(this.name, method, this.errorMessage)
  }
}
