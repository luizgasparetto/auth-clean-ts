import { NextFunction, Request, Response } from "express";

import { Middleware } from "../../shared/contracts/middleware";

export class ExpressMiddlewareAdapter {
  static adapt(middleware: Middleware) {
    return async (req: Request, res: Response, next: NextFunction) => {
     const request = {  user_id: req.user_id, accessToken: req.headers?.['x-access-token'], ...(req.headers || {}) };

      const httpResponse = await middleware.handle(request);

      if (httpResponse.statusCode === 200) {
        Object.assign(req, httpResponse.body);

        if (httpResponse.body['user_id']) {
          req.user_id = httpResponse.body['user_id'];
        }

        next();
      } else {
        res.status(httpResponse.statusCode).json({ error: httpResponse.body });
      }
    }
  }
}