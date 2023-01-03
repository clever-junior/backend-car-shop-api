import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

carRoutes.put(
  '/cars/:id',
  (req, res) => new CarController(req, res).update(),
);

carRoutes.get(
  '/cars/:id',
  (req, res) => new CarController(req, res).readById(),
);

carRoutes.get(
  '/cars',
  (req, res) => new CarController(req, res).read(),
);

carRoutes.post(
  '/cars',
  (req, res) => new CarController(req, res).create(),
);

export default carRoutes;
