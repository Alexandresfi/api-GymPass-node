export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      'IThe check-in can only be only be validated until 2- minutes of its creation',
    )
  }
}
