import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

carRoutes.get(
  '/cars/:id',
  (req, res) => new CarController(req, res).readById(),
);

carRoutes.get(
  '/cars',
  (req, res) => new CarController(req, res).read(),
);

carRoutes.put(
  '/cars/:id',
  (req, res) => new CarController(req, res).update(),
);

carRoutes.post(
  '/cars',
  (req, res) => new CarController(req, res).store(),
);

export default carRoutes;
