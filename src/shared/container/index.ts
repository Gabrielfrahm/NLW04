import { container } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepoitory';

import ISurveyRepository from '@modules/surveys/repositories/ISurveyRepository';
import SurveyRepoitory from '@modules/surveys/infra/typeorm/repositories/SurveyRepoitory';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ISurveyRepository>(
  'SurveyRepository',
  SurveyRepoitory,
);
