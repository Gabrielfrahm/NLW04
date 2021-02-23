import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  name: string;
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    name,
    email,
  }: IRequestDTO): Promise<User | undefined> {
    const checkUser = await this.userRepository.findByEmail(email);

    if (checkUser) {
      throw new AppError('user already existis');
    }

    const user = await this.userRepository.create({
      name,
      email,
    });

    return user;
  }
}

export default CreateUserService;
