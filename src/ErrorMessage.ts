import { reduce } from './util'

export default class ErrorMessage extends Error {
  constructor(message: string, params: object) {
    const formattedMessage = reduce(
      params,
      (m: any, v: any, k: any) => m.replace(`:${k}`, v),
      message
    )
    super(formattedMessage)
  }
}
