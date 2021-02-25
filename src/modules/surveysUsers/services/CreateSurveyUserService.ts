import AppError from '@shared/error/AppError';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import ISurveyRepository from '@modules/surveys/repositories/ISurveyRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import SurveyUser from '../infra/typeorm/entities/SurveyUser';
import ISurveyUserRepository from '../repositories/ISurveyUserRepository';
import SendMailProvider from '../provider/mail/SendMailProvider';

interface IRequestDTO {
  email: string;
  survey_id: string;
}

@injectable()
class CreateSurveyService {
  constructor(
    @inject('SurveyRepository')
    private surveyRepository: ISurveyRepository,

    @inject('SurveyUserRepository')
    private surveyUserRepository: ISurveyUserRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    email,
    survey_id,
  }: IRequestDTO): Promise<SurveyUser | undefined> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('user not found', 400);
    }

    const survey = await this.surveyRepository.findById(survey_id);

    if (!survey) {
      throw new AppError('survey not found', 400);
    }

    const surveyUserAlreadyExistis = await this.surveyUserRepository.findBySurveyId(
      user.id,
    );

    const npsPath = path.resolve(
      __dirname,
      '..',
      'views',
      'mails',
      'npsMail.hbs',
    );

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      link: process.env.URL_MAIL,
      user_id: user.id,
    };

    if (surveyUserAlreadyExistis) {
      await SendMailProvider.execute({
        to: email,
        subject: survey.title,
        variables,
        path: npsPath,
      });

      return surveyUserAlreadyExistis;
    }

    const surveyUser = await this.surveyUserRepository.create({
      survey_id: survey.id,
      user_id: user.id,
    });

    await SendMailProvider.execute({
      to: email,
      subject: survey.title,
      variables,
      path: npsPath,
    });

    return surveyUser;
  }
}

export default CreateSurveyService;
