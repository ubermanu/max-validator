import { first, has, size } from './util'

// TODO: Use a better error management system (with short accessors)
export class Validation {
  protected messages: object = {}

  constructor(messages) {
    this.messages = messages
  }

  // TODO: Iterate through all the fields
  public count(): number {
    return size(this.messages)
  }

  public failed(): boolean {
    return this.count() > 0
  }

  public passed(): boolean {
    return !this.failed()
  }

  public error(field: string, ruleName: string = null): boolean {
    return this.message(field, ruleName) !== undefined
  }

  public message(field: string, ruleName: any = null): string {
    if (!has(this.messages, field)) {
      return undefined
    }
    if (ruleName == null) {
      return first(this.messages[field])
    }
    if (ruleName == true) {
      return this.messages[field].join(', ')
    }
    return has(this.messages[field], ruleName) ? this.messages[field][ruleName] : undefined
  }

  /**
   * @deprecated
   * @see count
   */
  public getErrorCount() {
    return this.count()
  }

  /**
   * @deprecated
   * @see failed
   */
  public hasErrors(): boolean {
    return this.failed()
  }

  /**
   * @deprecated
   * @see error
   */
  public isError(field: string, ruleName: string = null): boolean {
    return this.error(field, ruleName)
  }

  /**
   * @deprecated
   * @see message
   */
  public getError(field: string, ruleName: any = null): string {
    return this.message(field, ruleName)
  }
}

/**
 * The validation builder is an interface to generate the validation object.
 * @see Schema
 */
export class ValidationBuilder {
  protected messages: object = {}

  public static create() {
    return new ValidationBuilder()
  }

  public addError(field: string, ruleName: string, message: string) {
    if (!has(this.messages, field)) {
      this.messages[field] = {}
    }
    this.messages[field][ruleName] = message
    return this
  }

  public build() {
    return new Validation(this.messages)
  }
}
