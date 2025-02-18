import { Validator } from '../src/Validator'

const v = new Validator()

it('should validate an object', () => {
  const data = {
    name: 'Boris',
    age: 40,
  }

  const schema = {
    name: 'string|required',
    age: 'numeric',
  }

  expect(v.setSchema(schema).validate(data).hasErrors()).toBe(false)
})

it('should get errors on failed validation', () => {
  const data = {
    age: 'twelve',
  }

  const schema = {
    age: 'numeric|required',
  }

  expect(v.setSchema(schema).validate(data).hasErrors()).toBe(true)
})

it('should throw and error if the validation method does not exist', () => {
  const schema = {
    name: 'unknown',
  }

  expect(() => v.setSchema(schema)).toThrowError()
})

it('should be extended with custom rule', () => {
  v.extend('custom_rule', function (value: any) {
    return value === 'test' || 'Error, %0 must be "test"'
  })

  const schema = { name: 'custom_rule' }
  v.setSchema(schema)

  expect(v.validate({ name: 'test' }).hasErrors()).toBe(false)
  expect(v.validate({ name: 'not_test' }).hasErrors()).toBe(true)
})

it('should return a validation result with correct data', () => {
  const data = {
    name: 'test',
    age: 40,
  }
  const schema = {
    name: 'required|string|min:40|starts_with:Ga',
    age: 'numeric',
  }
  v.setSchema(schema)

  expect(v.validate(data).isError('name')).toBe(true)
  expect(v.validate(data).isError('name')).not.toBe(false)

  expect(v.validate(data).isError('name', 'required')).toBe(false)
  expect(v.validate(data).isError('name', 'string')).toBe(false)
  expect(v.validate(data).isError('name', 'min')).toBe(true)
  expect(v.validate(data).isError('name', 'starts_with')).toBe(true)
})

it('should skip validation if not required and empty', () => {
  const schema = {
    age: 'numeric',
  }
  v.setSchema(schema)

  expect(v.validate({ age: null }).isError('age')).not.toBe(true)
  expect(v.validate({ age: undefined }).isError('age')).not.toBe(true)
  expect(v.validate({ age: false }).isError('age')).not.toBe(true)
})

// https://github.com/malkhazidartsmelidze/max-validator/issues/15
it('should work with the required rule alone', () => {
  const schema = {
    age: 'required',
  }
  v.setSchema(schema)

  expect(v.validate({ age: false }).isError('age')).toBe(true)
  expect(v.validate({ age: null }).isError('age')).toBe(true)
  expect(v.validate({ age: undefined }).isError('age')).toBe(true)

  expect(v.validate({ age: 'some_string' }).isError('age')).not.toBe(true)
  expect(v.validate({ age: 1234 }).isError('age')).not.toBe(true)
})
