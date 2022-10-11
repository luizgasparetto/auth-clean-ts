export class HttpResponse {
  public readonly body: any;
  public readonly statusCode: number;

  private constructor(body: any, statusCode: number = 500) {
    this.body = body;
    this.statusCode = statusCode;
  }

  static ok(body: any): HttpResponse {
    return new HttpResponse(body, 200);
  }

  static created(body: any = undefined): HttpResponse {
    return new HttpResponse(body, 201);
  }

  static badRequest(body: any): HttpResponse {
    return new HttpResponse(body, 400);
  }

  static unauthorized(body: any): HttpResponse {
    return new HttpResponse(body, 401);
  }
}
