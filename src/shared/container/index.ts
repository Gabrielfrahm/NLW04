import { container } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepoitory';

import ISurveyRepository from '@modules/surveys/repositories/ISurveyRepository';
import SurveyRepository from '@modules/surveys/infra/typeorm/repositories/SurveyRepoitory';

import ISurveyUserRepository from '@modules/surveysUsers/repositories/ISurveyUserRepository';
import SurveyUserRepository from '@modules/surveysUsers/infra/typeorm/repositories/SurveyUserRepoitory';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ISurveyRepository>(
  'SurveyRepository',
  SurveyRepository,
);

container.registerSingleton<ISurveyUserRepository>(
  'SurveyUserRepository',
  SurveyUserRepository,
);
