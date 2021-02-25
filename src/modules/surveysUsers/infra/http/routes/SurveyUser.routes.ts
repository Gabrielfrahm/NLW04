import { Router } from 'express';
import SurveyUserController from '../controller/SurveyUserController';

const surveyUserRouter = Router();
const surveyUserController = new SurveyUserController();

surveyUserRouter.post('/', surveyUserController.create);
// surveyRouter.get('/', surveyController.index);

export default surveyUserRouter;
