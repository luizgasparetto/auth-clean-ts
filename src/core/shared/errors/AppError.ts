import { Request, Response } from "express";

export abstract class AppError {
  protected readonly message: string;
  protected readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }

  static handler(err: Error, request: Request, response: Response): Response {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}