import ICreateSurveyDTO from '@modules/surveys/dtos/ICreateSurveyDTO';
import ISurveyRepository from '@modules/surveys/repositories/ISurveyRepository';
import { getRepository, Repository } from 'typeorm';
import Survey from '../entities/Survey';

class SurveyRepository implements ISurveyRepository {
  private ormRepository: Repository<Survey>;

  constructor() {
    this.ormRepository = getRepository(Survey);
  }

  public async findById(user_id: string): Promise<Survey | undefined> {
    const user = await this.ormRepository.findOne(user_id);

    return user;
  }

  public async findByTitle(title: string): Promise<Survey | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        title,
      },
    });

    return user;
  }

  public async findAll(): Promise<Survey[] | undefined> {
    const user = await this.ormRepository.find();

    return user;
  }

  public async create(data: ICreateSurveyDTO): Promise<Survey> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(data: ICreateSurveyDTO): Promise<Survey> {
    return this.ormRepository.save(data);
  }

  public async delete(user_id: string): Promise<void> {
    await this.ormRepository.delete(user_id);
  }
}

export default SurveyRepository;
