import { Request, Response } from "express";

export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    return response.json({ message: "User deleted successfully" });
  }
}