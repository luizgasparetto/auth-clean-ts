import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "../../domain/usecases/CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUsecase = container.resolve(CreateUserUseCase);

    await createUserUsecase.execute(request.body);

    return response.status(201).json({ message: 'User created successfully' });
  }
}

export { CreateUserController };