import { has, size } from './util'

/**
 * FIXME: Remove the ts-ignore markups
 */
export class Validation {
  protected errors: object = {}

  public addError(field: string, ruleName: string, message: string) {
    if (!has(this.errors, field)) {
      // @ts-ignore
      this.errors[field] = []
    }
    // @ts-ignore
    this.errors[field][ruleName] = message
    return this
  }

  public hasError(): boolean {
    return size(this.errors) > 0
  }

  public isError(field: string, ruleName: string = null): boolean {
    return this.getError(field, ruleName) !== undefined
  }

  public getError(field: string, ruleName: string = null): string {
    if (!has(this.errors, field)) {
      return undefined
    }
    if (ruleName) {
      // @ts-ignore
      return has(this.errors[field], ruleName) ? this.errors[field][ruleName] : undefined
    }
    // @ts-ignore
    return this.errors[field].join(', ')
  }
}
