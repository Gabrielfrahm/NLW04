import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import SurveyUser from '../infra/typeorm/entities/SurveyUser';
import ISurveyUserRepository from '../repositories/ISurveyUserRepository';

interface IRequestDTO {
  u: string;
  value: number;
}

@injectable()
class CreateSurveyService {
  constructor(
    @inject('SurveyUserRepository')
    private surveyUserRepository: ISurveyUserRepository,
  ) {}

  public async execute({
    u,
    value,
  }: IRequestDTO): Promise<SurveyUser | undefined> {
    const surveyUser = await this.surveyUserRepository.findByUserId(u);

    if (!surveyUser) {
      throw new AppError('user not found', 400);
    }

    surveyUser.value = value;
    await this.surveyUserRepository.save(surveyUser);

    return surveyUser;
  }
}

export default CreateSurveyService;
