import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/Car';
import ErrorHandler from '../errors';

export default class CarService {
  private createDomain(car: ICar | null) {
    if (car) { return new Car(car); }

    return null;
  }

  public async create(car: ICar) {
    const carODM = new CarODM();

    const newCar = await carODM.create(car);

    return this.createDomain(newCar);
  }

  public async read() {
    const carODM = new CarODM();
    const cars = await carODM.read();

    const response = cars.map((car) => this.createDomain(car));

    return response;
  }

  public async readOne(id: string) {
    const carODM = new CarODM();
    const car = await carODM.readOne(id);
    return this.createDomain(car);
  }

  public async update(id: string, data: ICar) {
    const carODM = new CarODM();

    const car = await carODM.update(id, data);
    
    if (!car) { throw new ErrorHandler('Car not found', 404); }

    if (car) { return this.createDomain(car); }
  }
}
