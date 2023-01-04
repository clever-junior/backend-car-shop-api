import {
  Model,
  Schema,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';
import ErrorHandler from '../errors';

export default abstract class AbstractODM<T> {
  constructor(
    protected schema: Schema,
    protected model: Model<T>,
  ) {}

  async create(props: T) { return this.model.create({ ...props }); }

  async read() { return this.model.find(); }

  async update(id: string, data: T) {
    if (isValidObjectId(id)) {
      const updatedVehicle = this.model
        .findOneAndUpdate({ _id: { $eq: id } }, { ...data } as UpdateQuery<T>, { new: true });
      
      return updatedVehicle;
    }
    
    throw new ErrorHandler('Invalid mongo id', 422);
  }

  async readOne(id: string) {
    if (isValidObjectId(id)) { return this.model.findOne({ _id: { $eq: id } }); }
  
    throw new ErrorHandler('Invalid mongo id', 422);
  }
}