export class SaveError extends Error {
  constructor() {
    super('Not Saved')
  }
}


export class NotAuthorizedError extends Error {
  constructor() {
    super('Not Authorized')
  }
}
