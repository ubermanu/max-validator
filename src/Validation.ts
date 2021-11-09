import { first, has, size } from './util'

// TODO: Use a better error management system (with short accessors)
export class Validation {
  protected errors: object = {}

  public addError(field: string, ruleName: string, message: string) {
    if (!has(this.errors, field)) {
      this.errors[field] = {}
    }
    this.errors[field][ruleName] = message
    return this
  }

  // TODO: Iterate through all the fields
  public getErrorCount() {
    return size(this.errors)
  }

  public hasErrors(): boolean {
    return this.getErrorCount() > 0
  }

  public isError(field: string, ruleName: string = null): boolean {
    return this.getError(field, ruleName) !== undefined
  }

  public getError(field: string, ruleName: any = null): string {
    if (!has(this.errors, field)) {
      return undefined
    }
    if (ruleName == null) {
      return first(this.errors[field])
    }
    if (ruleName == true) {
      return this.errors[field].join(', ')
    }
    return has(this.errors[field], ruleName) ? this.errors[field][ruleName] : undefined
  }
}
