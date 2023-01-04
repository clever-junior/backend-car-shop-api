import { Router } from 'express';
import carRoutes from './CarRoutes';
import motorcycleRoutes from './MotorcyclesRoutes';

const routes = Router();

routes.use(carRoutes);

routes.use(motorcycleRoutes);

export default routes;