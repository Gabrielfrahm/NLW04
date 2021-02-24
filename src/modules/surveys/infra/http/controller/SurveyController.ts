import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/error/AppError';
import CreateSurveyService from '@modules/surveys/services/CreateSurveyService';
import ShowSurveyService from '@modules/surveys/services/ShowSurveyService';

class SurveyController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { title, description } = request.body;

      const createSurvey = container.resolve(CreateSurveyService);

      const survey = await createSurvey.execute({
        title,
        description,
      });
      return response.status(201).json(survey);
    } catch (err) {
      throw new AppError(err);
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const showSurvey = container.resolve(ShowSurveyService);

      const surveys = await showSurvey.execute();
      return response.status(201).json(surveys);
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default SurveyController;
