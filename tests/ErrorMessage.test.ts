import { ErrorMessage } from '../src/ErrorMessage'

it('should output a message without args', () => {
  const error = new ErrorMessage('test')
  expect(error.message).toBe('test')
})

it('should output a message with args', () => {
  const error = new ErrorMessage('test %0, %1', 'arg1', 'arg2')
  expect(error.message).toBe('test arg1, arg2')
})
