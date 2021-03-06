import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/error/AppError';
import CreateSurveyUserService from '@modules/surveysUsers/services/CreateSurveyUserService';

class SurveyUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, survey_id } = request.body;

      const createSurveyUser = container.resolve(CreateSurveyUserService);

      const surveyUser = await createSurveyUser.execute({
        email,
        survey_id,
      });
      return response.status(201).json(surveyUser);
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default SurveyUserController;
