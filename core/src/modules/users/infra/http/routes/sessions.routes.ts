import { Router } from 'express';
import SessionsController from '../controllers/SessiosController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
