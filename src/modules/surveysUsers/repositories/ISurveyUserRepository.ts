import ICreateSurveyUserDTO from '../dtos/ICreateSurveyUserDTO';
import SurveyUser from '../infra/typeorm/entities/SurveyUser';

export default interface ISurveyUserRepository {
  findById(surveyUser_id: string): Promise<SurveyUser | undefined>;
  findBySurveyId(user_id: string): Promise<SurveyUser | undefined>;
  findAll(): Promise<SurveyUser[] | undefined>;
  create(data: ICreateSurveyUserDTO): Promise<SurveyUser>;
  save(data: ICreateSurveyUserDTO): Promise<SurveyUser>;
  delete(surveyUser_id: string): Promise<void>;
}
