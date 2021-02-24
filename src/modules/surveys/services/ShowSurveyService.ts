import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Survey from '../infra/typeorm/entities/Survey';
import ISurveyRepository from '../repositories/ISurveyRepository';

@injectable()
class ShowSurveyService {
  constructor(
    @inject('SurveyRepository')
    private surveyRepository: ISurveyRepository,
  ) {}

  public async execute(): Promise<Survey[] | undefined> {
    const checkSurveys = await this.surveyRepository.findAll();

    if (!checkSurveys) {
      throw new AppError('no record =(');
    }

    return checkSurveys;
  }
}

export default ShowSurveyService;
