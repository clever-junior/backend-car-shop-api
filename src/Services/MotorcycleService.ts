import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/Motorcycle';
// import ErrorHandler from '../errors';

export default class MotorcycleService {
  private createDomain(data: IMotorcycle | null) {
    if (data) { return new Motorcycle(data); }

    return null;
  }

  public async create(data: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();

    const newMotorcycle = await motorcycleODM.create(data);

    return this.createDomain(newMotorcycle);
  }

  // public async read() {
  //   const motorcycleODM = new MotorcycleODM();
  //   const cars = await motorcycleODM.read();

  //   const response = cars.map((car) => this.createDomain(car));

  //   return response;
  // }

  // public async readOne(id: string) {
  //   const motorcycleODM = new MotorcycleODM();
  //   const car = await motorcycleODM.readOne(id);
  //   return this.createDomain(car);
  // }

  // public async update(id: string, data: IMotorcycle) {
  //   const motorcycleODM = new MotorcycleODM();

  //   const car = await motorcycleODM.update(id, data);
    
  //   if (!car) { throw new ErrorHandler('Car not found', 404); }

  //   if (car) { return this.createDomain(car); }
  // }
}
