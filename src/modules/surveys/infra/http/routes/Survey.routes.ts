import { Router } from 'express';
import SurveyController from '../controller/SurveyController';

const surveyRouter = Router();
const surveyController = new SurveyController();

surveyRouter.post('/', surveyController.create);
surveyRouter.get('/', surveyController.index);

export default surveyRouter;
