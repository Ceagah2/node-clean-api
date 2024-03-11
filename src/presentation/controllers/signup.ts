import {
  InvalidParamError,
  MissingParamError
} from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import {
  type Controller,
  type EmailValidator,
  type HttpRequest,
  type HttpResponse
} from '../protocols'
export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (EmailValidator: EmailValidator) {
    this.emailValidator = EmailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (e) {
      return serverError()
    }
  }
}
