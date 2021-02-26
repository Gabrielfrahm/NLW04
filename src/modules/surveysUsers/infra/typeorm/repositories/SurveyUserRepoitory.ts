import ICreateSurveyUserDTO from '@modules/surveysUsers/dtos/ICreateSurveyUserDTO';
import ISurveyUserRepository from '@modules/surveysUsers/repositories/ISurveyUserRepository';
import { getRepository, IsNull, Not, Repository } from 'typeorm';
import SurveyUser from '../entities/SurveyUser';

class SurveyUserRepository implements ISurveyUserRepository {
  private ormRepository: Repository<SurveyUser>;

  constructor() {
    this.ormRepository = getRepository(SurveyUser);
  }

  public async findById(
    surveyUser_id: string,
  ): Promise<SurveyUser | undefined> {
    const surveyUser = await this.ormRepository.findOne(surveyUser_id);

    return surveyUser;
  }

  public async findBySurveyId(
    user_id: string,
  ): Promise<SurveyUser | undefined> {
    const surveyUser = await this.ormRepository.findOne({
      where: {
        user_id,
        value: null,
      },
      relations: ['user', 'survey'],
    });

    return surveyUser;
  }

  public async findByUserId(user_id: string): Promise<SurveyUser | undefined> {
    const surveyUser = await this.ormRepository.findOne({
      where: {
        user_id,
      },
      relations: ['user'],
    });

    return surveyUser;
  }

  public async findAll(survey_id: string): Promise<SurveyUser[] | undefined> {
    const surveyUser = await this.ormRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    return surveyUser;
  }

  public async create(data: ICreateSurveyUserDTO): Promise<SurveyUser> {
    const surveyUser = this.ormRepository.create(data);

    await this.ormRepository.save(surveyUser);

    return surveyUser;
  }

  public async save(data: ICreateSurveyUserDTO): Promise<SurveyUser> {
    return this.ormRepository.save(data);
  }

  public async delete(surveyUser_id: string): Promise<void> {
    await this.ormRepository.delete(surveyUser_id);
  }
}

export default SurveyUserRepository;
