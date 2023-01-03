import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

carRoutes.post(
  '/cars',
  (req, res) => new CarController(req, res).create(),
);

export default carRoutes;
