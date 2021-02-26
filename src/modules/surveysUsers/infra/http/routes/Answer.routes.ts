import { Router } from 'express';
import AnswerController from '../controller/AnswerController';

const answerRouter = Router();
const answerController = new AnswerController();

answerRouter.get('/:value', answerController.create);

export default answerRouter;
