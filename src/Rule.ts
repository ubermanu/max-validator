import { reduce } from './util'

export class Rule {
  name: string
  method: Function
  params: any[] = []
  errorMessage: string = null

  constructor(name: string, method: Function, errorMessage: string = '') {
    this.name = name
    this.method = method
    this.errorMessage = errorMessage
  }

  public setParams(...params: any) {
    this.params = params
    return this
  }

  public getName() {
    return this.name
  }

  /**
   * Return the error message formatted with the rule's params.
   * The first param is the name of the rule (e.g. 'required').
   */
  public getErrorMessage(fieldName: string) {
    return reduce(
      [fieldName, ...this.params],
      (m: any, val: any, key: any) => m.replace(`%${key}`, val),
      this.errorMessage
    )
  }

  /**
   * Returns TRUE if the rule passes.
   */
  public test(value: any, ...params: any): boolean {
    return this.method(value, ...(params || this.params)) === true
  }
}
