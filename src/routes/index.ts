import { Router } from 'express';
import carRoutes from './CarRoutes';

const routes = Router();

routes.use(carRoutes);

export default routes;