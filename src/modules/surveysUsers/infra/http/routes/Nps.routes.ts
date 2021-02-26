import { Router } from 'express';
import NPSController from '../controller/NPSController';

const npsRouter = Router();
const npsController = new NPSController();

npsRouter.get('/:survey_id', npsController.create);

export default npsRouter;
