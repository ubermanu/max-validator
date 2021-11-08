import { Ruleset, RulesetParser } from '../src/RulesetParser'
import { keys } from '../src/util'

const parser = new RulesetParser()
let ruleset: Ruleset[] = []

it('should parse schemes with strings as rules', () => {
  const scheme = {
    name: 'required|string|min:4',
    age: 'numeric|min:0',
  }

  expect(() => (ruleset = parser.parse(scheme))).not.toThrowError()

  // @ts-ignore
  expect(keys(ruleset.name)).toEqual(['required', 'string', 'min'])
  // @ts-ignore
  expect(keys(ruleset.age)).toEqual(['numeric', 'min'])
})

it('should parse schemes with an array of rules', () => {
  const scheme = {
    name: ['required', 'string', 'min:4', () => true],
    age: ['numeric', 'min:0'],
  }

  expect(() => (ruleset = parser.parse(scheme))).not.toThrowError()

  // @ts-ignore
  expect(keys(ruleset.name)).toEqual([
    'required',
    'string',
    'min',
    'anonymous_0',
  ])

  // @ts-ignore
  expect(keys(ruleset.age)).toEqual(['numeric', 'min'])
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
  expect(keys(ruleset.name)).toEqual(['required', 'string', 'min', 'test'])

  // @ts-ignore
  expect(keys(ruleset.age)).toEqual(['numeric', 'min'])
})
