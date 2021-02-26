import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

import ISurveyUserRepository from '../repositories/ISurveyUserRepository';

interface IRequestDTO {
  survey_id: string;
}

interface IResponseDTO {
  detractor: number;
  promoters: number;
  passive: number;
  totalAnswers: number;
  nps: number;
}

@injectable()
class CreateNPSService {
  constructor(
    @inject('SurveyUserRepository')
    private surveyUserRepository: ISurveyUserRepository,
  ) {}

  public async execute({ survey_id }: IRequestDTO): Promise<IResponseDTO> {
    const surveyUser = await this.surveyUserRepository.findAll(survey_id);

    if (!surveyUser) {
      throw new AppError('not found', 404);
    }

    const detractor = surveyUser.filter(
      survey => survey.value >= 0 && survey.value <= 6,
    ).length;

    const promoters = surveyUser.filter(
      survey => survey.value >= 9 && survey.value <= 10,
    ).length;

    const passive = surveyUser.filter(
      survey => survey.value >= 7 && survey.value <= 8,
    ).length;

    const totalAnswers = surveyUser.length;

    const calculate = Number(
      (((promoters - detractor) / totalAnswers) * 100).toFixed(2),
    );

    return {
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps: calculate,
    };
  }
}

export default CreateNPSService;
