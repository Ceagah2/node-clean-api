import { type HttpRequest, type HttpResponse } from './https'

export interface Controller {
  handle: (httpRequest: HttpRequest) => HttpResponse
}
