import { ConfiguredRule } from '../src/Rule'

it('should format the error message', () => {
  const rule = new ConfiguredRule('pg13', function (age) {
    return age >= 13 || 'You must be at least 13 years old to use this site.'
  })

  expect(rule.validate('age', 20)).toBe(true)
  expect(rule.validate('age', 5)).toBe('You must be at least 13 years old to use this site.')
})

it('should format the error message with params', () => {
  const rule = new ConfiguredRule(
    'start_with',
    function (str, prefix) {
      return str.startsWith(prefix) || '%0 should start with %1'
    },
    ['Jo']
  )

  expect(rule.validate('name', 'John')).toBe(true)
  expect(rule.validate('name', 'Henry')).toBe('name should start with Jo')
})

it('should return a success in anonymous functions', () => {
  const rule = new ConfiguredRule('start_with_test', (str) => {
    return str.startsWith('test') || 'should start with test'
  })

  expect(rule.validate('name', 'test123')).toBe(true)
  expect(rule.validate('name', 'John')).toBe('should start with test')
})
