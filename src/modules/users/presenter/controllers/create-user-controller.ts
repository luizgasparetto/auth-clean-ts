import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUsecase } from "../../domain/usecases/create-user/create-user-usecase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUsecase = container.resolve(CreateUserUsecase);

    await createUserUsecase.execute(request.body);

    return response.status(201).json({ message: 'User created successfully' });
  }
}

export { CreateUserController };