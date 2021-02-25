import { Router } from 'express';
import UserRouter from '@modules/users/infra/http/routes/User.routes';
import SurveyRouter from '@modules/surveys/infra/http/routes/Survey.routes';
import SurveyUserRouter from '@modules/surveysUsers/infra/http/routes/SurveyUser.routes';

const routes = Router();

routes.use('/users', UserRouter);
routes.use('/surveys', SurveyRouter);
routes.use('/sendMail', SurveyUserRouter);

export default routes;
