import { Rule } from '../src/Rule'

it('should format the error message', () => {
  const rule = new Rule('pg13', (age) => age >= 13, '%0 should be over 13')
  expect(rule.configure().validate('age', 20)).toBe(true)
  expect(rule.configure().validate('age', 5)).toBe('age should be over 13')
})

it('should format the error message with params', () => {
  const rule = new Rule('start_with', (str, prefix) => str.startsWith(prefix), '%0 should start with %1')
  expect(rule.configure(['Jo']).validate('name', 'John')).toBe(true)
  expect(rule.configure(['Jo']).validate('name', 'Henry')).toBe('name should start with Jo')
})
