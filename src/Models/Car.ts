import {
  Model,
  Schema,
  model,
  models,
  isValidObjectId,
  UpdateQuery,
} from 'mongoose';
import ICar from '../Interfaces/ICar';
import ErrorHandler from '../errors';

export default class CarODM {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });

    this.model = models.cars || model('cars', this.schema);
  }

  async create(data: ICar): Promise<ICar> {
    return this.model.create({ ...data });
  }

  async read(): Promise<ICar[]> {
    return this.model.find();
  }

  async readOne(id: string): Promise<ICar | null> {
    if (isValidObjectId(id)) {
      return this.model.findOne({ _id: { $eq: id } });
    }

    throw new Error('Invalid mongo id');
  }

  async update(id: string, data: ICar): Promise<ICar | null | undefined> {
    if (isValidObjectId(id)) {
      const updatedCar = this.model
        .findOneAndUpdate({ _id: { $eq: id } }, { ...data } as UpdateQuery<ICar>, { new: true });

      if (!updatedCar) {
        throw new ErrorHandler('Car not found', 404);
      }
      
      return updatedCar;
    }

    throw new ErrorHandler('Invalid mongo id', 422);
  }
}