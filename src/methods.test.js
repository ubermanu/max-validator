import { methods } from './methods';

it('should validate alpha/numeric characters', () => {
  const { alpha, alpha_dash, alpha_numeric } = methods;

  expect(alpha('aAbBcCdD')).toBe(true);
  expect(alpha('Abc123')).not.toBe(true);

  expect(alpha_dash('aAbBcCdD')).toBe(true);
  expect(alpha_dash('a-A-b-B-c-')).toBe(true);
  expect(alpha_dash('aBc-1')).not.toBe(true);

  expect(alpha_numeric('aBc1')).toBe(true);
  expect(alpha_numeric('aBc-1')).not.toBe(true);
});

it('should validate in between number values', () => {
  const { between } = methods;

  expect(between(10, 1, 10)).toBe(true);
  expect(between(-20, 4, 7)).not.toBe(true);

  expect(between('random_string', 10, 70)).toBe(true);
  expect(between('random_string', 2, 4)).not.toBe(true);
});

it('should validate boolean values', () => {
  const { boolean } = methods;

  expect(boolean(true)).toBe(true);
  expect(boolean(false)).toBe(true);

  expect(boolean('true')).not.toBe(true);
  expect(boolean(1)).not.toBe(true);
});

it('should validate checkbox (checked) values', () => {
  const { checked } = methods;

  expect(checked(true)).toBe(true);
  expect(checked(1)).toBe(true);
  expect(checked('on')).toBe(true);
  expect(checked('true')).toBe(true);

  expect(checked('yes')).not.toBe(true);
  expect(checked('checked')).not.toBe(true);
});

it('should contain all the values', () => {
  const { contains_all } = methods;

  expect(contains_all([1, 2, 3], 1, 2, 3)).toBe(true);
  expect(contains_all('random_string', 'str')).toBe(true);

  expect(contains_all([1, 2, 3], 1, 4, 5)).not.toBe(true);
  expect(contains_all('random_string', 'hello')).not.toBe(true);
});

it('should contain one of the values', () => {
  const { contains_one } = methods;

  expect(contains_one([1, 2, 3], 1, 4)).toBe(true);
  expect(contains_one('random_string', 'str')).toBe(true);

  expect(contains_one([1, 2, 3], 4, 5, 6)).not.toBe(true);
  expect(contains_one('random_string', 'hello')).not.toBe(true);
});
