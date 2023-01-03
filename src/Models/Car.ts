import {
  Model,
  Schema,
  model,
  models,
  isValidObjectId,
} from 'mongoose';
import ICar from '../Interfaces/ICar';

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
}