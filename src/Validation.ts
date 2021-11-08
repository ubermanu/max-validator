export class Validation {
  protected errors: Map<string, Error> = new Map()

  addError(field: string, message: Error) {
    this.errors.set(field, message)
  }

  hasError(): boolean {
    return this.errors.size > 0
  }

  isError(prop: string) {
    return this.errors.has(prop)
  }

  getError(prop: string) {
    return this.errors.get(prop)
  }
}
