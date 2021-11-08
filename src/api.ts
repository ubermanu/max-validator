import { Schema } from './Schema'
import { Validator } from './Validator'

// Enable some backward compatibility with the previous API.
const commonValidator = new Validator()

export function validate(object: object, schema: Schema) {
  return commonValidator.setSchema(schema).validate(object)
}
