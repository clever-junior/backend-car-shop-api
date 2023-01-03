import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

carRoutes.get(
  '/cars',
  (req, res) => new CarController(req, res).read(),
);

carRoutes.get(
  '/cars/:id',
  (req, res) => new CarController(req, res).readById(),
);

carRoutes.post(
  '/cars',
  (req, res) => new CarController(req, res).create(),
);

export default carRoutes;
