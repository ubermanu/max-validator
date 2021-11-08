import * as functions from '../src/initialRules'

it('should validate alpha/numeric characters', () => {
  const { alpha, alpha_dash, alpha_numeric } = functions

  expect(alpha.test('aAbBcCdD')).toBe(true)
  expect(alpha.test('Abc123')).not.toBe(true)

  expect(alpha_dash.test('aAbBcCdD')).toBe(true)
  expect(alpha_dash.test('a-A-b-B-c-')).toBe(true)
  expect(alpha_dash.test('aBc-1')).not.toBe(true)

  expect(alpha_numeric.test('aBc1')).toBe(true)
  expect(alpha_numeric.test('aBc-1')).not.toBe(true)
})

it('should validate in between number values', () => {
  const { between } = functions

  expect(between.test(10, 1, 10)).toBe(true)
  expect(between.test(-20, 4, 7)).not.toBe(true)

  expect(between.test('random_string', 10, 70)).toBe(true)
  expect(between.test('random_string', 2, 4)).not.toBe(true)
})

it('should validate boolean values', () => {
  const { boolean } = functions

  expect(boolean.test(true)).toBe(true)
  expect(boolean.test(false)).toBe(true)

  expect(boolean.test('true')).not.toBe(true)
  expect(boolean.test(1)).not.toBe(true)
})

it('should validate checkbox (checked) values', () => {
  const { checked } = functions

  expect(checked.test(true)).toBe(true)
  expect(checked.test(1)).toBe(true)
  expect(checked.test('on')).toBe(true)
  expect(checked.test('true')).toBe(true)

  expect(checked.test('yes')).not.toBe(true)
  expect(checked.test('checked')).not.toBe(true)
})

it('should contain all the values', () => {
  const { contains_all } = functions

  expect(contains_all.test([1, 2, 3], 1, 2, 3)).toBe(true)
  expect(contains_all.test('random_string', 'str')).toBe(true)

  expect(contains_all.test([1, 2, 3], 1, 4, 5)).not.toBe(true)
  expect(contains_all.test('random_string', 'hello')).not.toBe(true)
})

it('should contain one of the values', () => {
  const { contains_one } = functions

  expect(contains_one.test([1, 2, 3], 1, 4)).toBe(true)
  expect(contains_one.test('random_string', 'str')).toBe(true)

  expect(contains_one.test([1, 2, 3], 4, 5, 6)).not.toBe(true)
  expect(contains_one.test('random_string', 'hello')).not.toBe(true)
})

it('should validate a date', () => {
  const { date } = functions

  expect(date.test('2000-01-01')).toBe(true)
  expect(date.test(new Date())).toBe(true)

  expect(date.test('')).not.toBe(true)
  expect(date.test('1st of january')).not.toBe(true)
})

it('should validate an email', () => {
  const { email } = functions

  expect(email.test('user@example.org')).toBe(true)
  expect(email.test('user+1@example.com')).toBe(true)

  expect(email.test(true)).not.toBe(true)
  expect(email.test(1)).not.toBe(true)
  expect(email.test('not_an_email')).not.toBe(true)
})

it('should validate value ending with another', () => {
  const { ends_with } = functions

  expect(ends_with.test('random_string', 'ing')).toBe(true)
  expect(ends_with.test('random_string', '_string')).toBe(true)

  expect(ends_with.test('random_string', 'hello')).not.toBe(true)
  expect(ends_with.test('random_string', 'random')).not.toBe(true)
  expect(ends_with.test('random_string', 'str')).not.toBe(true)
})

it('should validate equal values', () => {
  const { equals } = functions

  expect(equals.test('test', 'test')).toBe(true)
  expect(equals.test('1', 1)).toBe(true)
  expect(equals.test(1, 1)).toBe(true)

  expect(equals.test('random_string', 'hello')).not.toBe(true)
  expect(equals.test(1, true)).not.toBe(true)
})

it('should validate if value is in array', () => {
  const { in_array } = functions

  expect(in_array.test('test', 'test')).toBe(true)
  expect(in_array.test('test', 'a', 'b', 'test', 'a')).toBe(true)

  expect(in_array.test('test', 'a', 'b', 'c')).not.toBe(true)
})

it('should validate ip', () => {
  const { ip } = functions

  expect(ip.test('127.0.0.1')).toBe(true)
  expect(ip.test('192.168.1.1')).toBe(true)

  // TODO: Add ipv6 support
  // expect(ip.test('::1')).toBe(true);

  expect(ip.test('not_an_ip')).not.toBe(true)
  expect(ip.test(1)).not.toBe(true)
  expect(ip.test(true)).not.toBe(true)
})

it('should validate json', () => {
  const { json } = functions

  expect(json.test('{"name": "Julia", "active": true}')).toBe(true)
  expect(json.test('{"name": oops}')).not.toBe(true)
})

it('should validate value below max', () => {
  const { max } = functions

  expect(max.test(40, 50)).toBe(true)
  expect(max.test('short_string', 40)).toBe(true)

  expect(max.test(40, -10)).not.toBe(true)
  expect(max.test('short_string', 5)).not.toBe(true)
})

it('should validate value above min', () => {
  const { min } = functions

  expect(min.test(40, 20)).toBe(true)
  expect(min.test('short_string', 4)).toBe(true)

  expect(min.test(40, 100)).not.toBe(true)
  expect(min.test('short_string', 20)).not.toBe(true)
})

it('should validate not equal values', () => {
  const { not_equals } = functions

  expect(not_equals.test('random_string', 'hello')).toBe(true)
  expect(not_equals.test(10, 20)).toBe(true)
  expect(not_equals.test(1, true)).toBe(true)

  expect(not_equals.test('test', 'test')).not.toBe(true)
  expect(not_equals.test('1', 1)).not.toBe(true)
  expect(not_equals.test(1, 1)).not.toBe(true)
})

it('should validate numeric value', () => {
  const { numeric } = functions

  expect(numeric.test(10)).toBe(true)
  expect(numeric.test('10')).toBe(true)
  expect(numeric.test(-10)).toBe(true)
  expect(numeric.test('-10')).toBe(true)

  expect(numeric.test(true)).not.toBe(true)
  expect(numeric.test('twelve')).not.toBe(true)
})

it('should validate numeric value', () => {
  const { object } = functions

  expect(object.test({})).toBe(true)
  expect(object.test(new Map())).toBe(true)
  expect(object.test({ name: 'Sergio' })).toBe(true)

  expect(object.test([])).not.toBe(true)
  expect(object.test(true)).not.toBe(true)
  expect(object.test(100)).not.toBe(true)
  expect(object.test('not_an_object')).not.toBe(true)
})

it('should validate value starting with another', () => {
  const { starts_with } = functions

  expect(starts_with.test('random_string', 'random_')).toBe(true)
  expect(starts_with.test('random_string', 'r')).toBe(true)

  expect(starts_with.test('random_string', 'hello')).not.toBe(true)
  expect(starts_with.test('random_string', 'dom')).not.toBe(true)
  expect(starts_with.test('random_string', 'ing')).not.toBe(true)
})

it('should validate url', () => {
  const { url } = functions

  expect(url.test('http://example.com')).toBe(true)
  expect(url.test('https://www.example.org')).toBe(true)
  expect(url.test('https://www.example.org/dir?param#hash')).toBe(true)

  expect(url.test('a@a')).not.toBe(true)
  expect(url.test(true)).not.toBe(true)
})

it('should validate phone numbers', () => {
  const { phone } = functions

  expect(phone.test('1122334455')).toBe(true)
  expect(phone.test('11 22 33 44 55')).toBe(true)
  expect(phone.test('+33122334455')).toBe(true)

  expect(phone.test(true)).not.toBe(true)
  expect(phone.test(1)).not.toBe(true)
})

it('should validate required values', () => {
  const { required } = functions

  expect(required.test('required_string')).toBe(true)
  expect(required.test(true)).toBe(true)
  expect(required.test('true')).toBe(true)
  expect(required.test({ name: 'James' })).toBe(true)
  expect(required.test([1, 2, 3])).toBe(true)

  expect(required.test(null)).not.toBe(true)
  expect(required.test(undefined)).not.toBe(true)
  expect(required.test(false)).not.toBe(true)
  expect(required.test('')).not.toBe(true)

  // Do not accept empty objects or arrays
  expect(required.test({})).not.toBe(true)
  expect(required.test([])).not.toBe(true)
})

it('should validate string values', () => {
  const { string } = functions

  expect(string.test('is_a_string')).toBe(true)
  expect(string.test('')).toBe(true)

  expect(string.test(10)).not.toBe(true)
  expect(string.test(true)).not.toBe(true)
  expect(string.test({})).not.toBe(true)
  expect(string.test([])).not.toBe(true)
})
