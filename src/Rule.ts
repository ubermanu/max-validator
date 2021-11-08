import ErrorMessage from './ErrorMessage'

export class Rule {
  name: string
  method: Function
  errorMessage: string = null

  constructor(name: string, method: Function, errorMessage: string) {
    this.name = name
    this.method = method
    this.errorMessage = errorMessage
  }

  test(value: string, params: object): boolean {
    return this.method(value, params) !== true
  }

  validate(value: string, params: object): boolean {
    if (this.test(value, params)) {
      return true
    }
    throw new ErrorMessage(this.errorMessage, { ...params, name: this.name })
  }
}
