import { Schema } from './src/Schema'
import { Validator } from './src/Validator'

// Enable some backward compatibility with the previous API.
const commonValidator = new Validator()

export function validate(object: object, schema: Schema) {
  return commonValidator.setSchema(schema).validate(object)
}

export default Validator
