import { Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CreateCarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private service: CarService;

  constructor(
    req: Request,
    res: Response,
  ) {
    this.req = req;
    this.res = res;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.create(car);

      return this.res.status(201).json(newCar);
    } catch (error) {
      const { message } = error as Error;
      return this.res.status(500).json({ message });
    }
  }
}