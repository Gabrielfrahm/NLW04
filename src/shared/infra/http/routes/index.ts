import { Router } from 'express';
import UserRouter from '@modules/users/infra/http/routes/User.routes';
import SurveyRouter from '@modules/surveys/infra/http/routes/Survey.routes';

const routes = Router();

routes.use('/users', UserRouter);
routes.use('/surveys', SurveyRouter);

export default routes;
