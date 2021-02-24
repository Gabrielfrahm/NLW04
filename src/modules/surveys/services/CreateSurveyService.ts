import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Survey from '../infra/typeorm/entities/Survey';
import ISurveyRepository from '../repositories/ISurveyRepository';

interface IRequestDTO {
  title: string;
  description: string;
}

@injectable()
class CreateSurveyService {
  constructor(
    @inject('SurveyRepository')
    private surveyRepository: ISurveyRepository,
  ) {}

  public async execute({
    title,
    description,
  }: IRequestDTO): Promise<Survey | undefined> {
    const checkSurvey = await this.surveyRepository.findByTitle(title);

    if (checkSurvey) {
      throw new AppError('survey already existis', 400);
    }

    const survey = await this.surveyRepository.create({
      title,
      description,
    });

    return survey;
  }
}

export default CreateSurveyService;
