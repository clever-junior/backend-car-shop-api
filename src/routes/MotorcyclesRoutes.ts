import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRoutes = Router();

motorcycleRoutes.get(
  '/motorcycles/:id',
  (req, res) => new MotorcycleController(req, res).readById(),
);

motorcycleRoutes.get(
  '/motorcycles',
  (req, res) => new MotorcycleController(req, res).read(),
);

motorcycleRoutes.put(
  '/motorcycles/:id',
  (req, res) => new MotorcycleController(req, res).update(),
);

motorcycleRoutes.post(
  '/motorcycles',
  (req, res) => new MotorcycleController(req, res).store(),
);

export default motorcycleRoutes;
