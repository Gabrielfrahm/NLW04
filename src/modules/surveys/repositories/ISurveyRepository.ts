import ICreateSurveyDTO from '../dtos/ICreateSurveyDTO';
import Survey from '../infra/typeorm/entities/Survey';

export default interface ISurveyRepository {
  findById(user_id: string): Promise<Survey | undefined>;
  findByTitle(title: string): Promise<Survey | undefined>;
  findAll(): Promise<Survey[] | undefined>;
  create(data: ICreateSurveyDTO): Promise<Survey>;
  save(data: ICreateSurveyDTO): Promise<Survey>;
  delete(user_id: string): Promise<void>;
}
