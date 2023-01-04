import { Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';
import ErrorHandler from '../errors';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private service: MotorcycleService;

  constructor(
    req: Request,
    res: Response,
  ) {
    this.req = req;
    this.res = res;
    this.service = new MotorcycleService();
  }

  public async store() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.create(motorcycle);

      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      const { message } = error as Error;
      return this.res.status(500).json({ message });
    }
  }

  public async update() {
    const Motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    const { id } = this.req.params;

    try {
      const updatedMotorcycle = await this.service.update(id, Motorcycle);

      return this.res.status(200).json(updatedMotorcycle);
    } catch (error) {
      const { message, status } = error as ErrorHandler;
      return this.res.status(status).json({ message });
    }
  }

  public async read() {
    try {
      const Motorcycles = await this.service.read();

      return this.res.status(200).json(Motorcycles);
    } catch (error) {
      const { message } = error as Error;
      return this.res.status(500).json({ message });
    }
  }

  public async readById() {
    const { id } = this.req.params;

    try {
      const Motorcycle = await this.service.readOne(id);

      if (!Motorcycle) { return this.res.status(404).json({ message: 'Motorcycle not found' }); }

      return this.res.status(200).json(Motorcycle);
    } catch (error) {
      const { message, status } = error as ErrorHandler;
      return this.res.status(status).json({ message });
    }
  }
}