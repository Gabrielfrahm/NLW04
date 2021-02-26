import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/error/AppError';
import CreateNPSService from '@modules/surveysUsers/services/CreateNPSService';

class SurveyUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { survey_id } = request.params;

      const createNPS = container.resolve(CreateNPSService);

      const NPS = await createNPS.execute({
        survey_id,
      });
      return response.status(201).json(NPS);
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default SurveyUserController;
