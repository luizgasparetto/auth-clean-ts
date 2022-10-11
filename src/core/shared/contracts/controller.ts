import { HttpResponse } from "../../infra/types/http-response";

export interface Controller<T = any> {
  handle(request: T): Promise<HttpResponse>;
}