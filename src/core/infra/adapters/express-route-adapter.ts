import { Controller } from "src/core/shared/contracts/controller";

import { Request, Response } from "express";

export class ExpressRouteAdapter {
  static adapt(controller: Controller) {
    return async (request: Request, response: Response) => {
      const requestData = { ...request.body, ...request.params, ...request.query };

      const httpResponse = await controller.handle(requestData);

      return response.status(httpResponse.statusCode).json(httpResponse.body);
    }
  }
}