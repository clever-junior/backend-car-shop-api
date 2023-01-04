import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRoutes = Router();

motorcycleRoutes.post(
  '/motorcycles',
  (req, res) => new MotorcycleController(req, res).store(),
);

export default motorcycleRoutes;
