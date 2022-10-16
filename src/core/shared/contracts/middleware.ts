import { HttpResponse } from "src/core/infra/protocols/http_response";

export interface Middleware<T = any> {
  handle: (httpRequest: T) => Promise<HttpResponse>
}