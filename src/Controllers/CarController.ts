import { Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';
import ErrorHandler from '../errors';

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

  public async update() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    const { id } = this.req.params;

    try {
      const updatedCar = await this.service.update(id, car);

      return this.res.status(200).json(updatedCar);
    } catch (error) {
      const { message, status } = error as ErrorHandler;
      return this.res.status(status).json({ message });
    }
  }

  public async read() {
    try {
      const cars = await this.service.read();

      return this.res.status(200).json(cars);
    } catch (error) {
      const { message } = error as Error;
      return this.res.status(500).json({ message });
    }
  }

  public async readById() {
    const { id } = this.req.params;

    try {
      const car = await this.service.readOne(id);

      if (!car) { return this.res.status(404).json({ message: 'Car not found' }); }

      return this.res.status(200).json(car);
    } catch (error) {
      const { message, status } = error as ErrorHandler;
      return this.res.status(status).json({ message });
    }
  }
}