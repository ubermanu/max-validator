import { reduce } from './util'

export class Rule {
  name: string
  method: Function
  defaultParams: any[] = []
  errorMessage: string = null

  constructor(name: string, method: Function, errorMessage: string = '') {
    this.name = name
    this.method = method
    this.errorMessage = errorMessage
  }

  public setDefaultParams(...params: any) {
    this.defaultParams = params
    return this
  }

  public getName() {
    return this.name
  }

  /**
   * Return the error message formatted with the rule's params.
   * The first param is the name of the rule (e.g. 'required').
   */
  public getErrorMessage() {
    return reduce(
      [this.name, ...this.defaultParams],
      (m: any, val: any, key: any) => m.replace(`%${key}`, val),
      this.errorMessage
    )
  }

  /**
   * Returns TRUE if the rule passes.
   */
  public test(value: any, ...params: any): boolean {
    return this.method(value, ...(params || this.defaultParams)) === true
  }

  /**
   * Throw an error with the rule message if the test fails.
   */
  public validate(value: any): boolean {
    if (!this.test(value)) {
      throw new Error(this.getErrorMessage())
    }
    return true
  }
}
