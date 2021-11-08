import { RulesetParser } from '../src/RulesetParser'
import { Rule } from '../src/Rule'
import { size } from '../src/util'

const parser = new RulesetParser()
let ruleset: Rule[][] = []

it('should parse schemes with strings as rules', () => {
  const scheme = {
    name: 'required|string|min:4',
    age: 'numeric|min:0',
  }

  expect(() => (ruleset = parser.parse(scheme))).not.toThrowError()

  // @ts-ignore
  expect(size(ruleset.name)).toEqual(3)

  // @ts-ignore
  expect(size(ruleset.age)).toEqual(2)
})

it('should parse schemes with an array of rules', () => {
  const scheme = {
    name: ['required', 'string', 'min:4', () => true],
    age: ['numeric', 'min:0'],
  }

  expect(() => (ruleset = parser.parse(scheme))).not.toThrowError()

  // @ts-ignore
  expect(size(ruleset.name)).toEqual(4)

  // @ts-ignore
  expect(size(ruleset.age)).toEqual(2)
})

it('should parse schemes with an object of rules', () => {
  const scheme = {
    name: {
      required: true,
      string: true,
      min: 4,
      test(value: any) {
        return value === 'test'
      },
    },
    age: {
      numeric: true,
      min: 0,
    },
  }

  expect(() => (ruleset = parser.parse(scheme))).not.toThrowError()

  // @ts-ignore
  expect(size(ruleset.name)).toEqual(4)

  // @ts-ignore
  expect(size(ruleset.age)).toEqual(2)
})
