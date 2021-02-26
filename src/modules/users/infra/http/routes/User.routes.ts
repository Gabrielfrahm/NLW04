import { Router } from 'express';
import { celebrate, Joi, Segments, errors } from 'celebrate';
import UserController from '../controller/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
    },
  }),
  errors(),
  userController.create,
);

export default userRouter;
