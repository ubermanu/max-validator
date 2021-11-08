import { reduce } from './util'

export class ErrorMessage extends Error {
  constructor(message: string, ...params: any) {
    const formattedMessage = reduce(
      params,
      (m: any, val: any, key: any) => m.replace(`%${key}`, val),
      message
    )
    super(formattedMessage)
  }
}
