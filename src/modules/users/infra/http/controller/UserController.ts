import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/error/AppError';
import CreateUserService from '@modules/users/services/CreateUserService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email } = request.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        name,
        email,
      });
      return response.status(201).json(user);
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default UserController;
