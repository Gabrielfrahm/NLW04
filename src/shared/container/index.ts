import { container } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepoitory';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
