import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/error/AppError';
import CreateAnswerService from '@modules/surveysUsers/services/CreateAnswerService';
// import ShowSurveyService from '@modules/surveys/services/ShowSurveyService';

class SurveyUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { value } = request.params;
      const { u } = request.query;

      const createAnswer = container.resolve(CreateAnswerService);

      const surveyUser = await createAnswer.execute({
        u: String(u),
        value: Number(value),
      });
      return response.status(201).json(surveyUser);
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default SurveyUserController;
