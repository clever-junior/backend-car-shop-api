import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/Car';

class CreateCarService {
  private createDomain(data: ICar | null) {
    if (data) {
      return new Car(data);
    }

    return null;
  }

  public async create(data: ICar) {
    const carODM = new CarODM();

    const newCar = await carODM.create(data);

    return this.createDomain(newCar);
  }
}

export default CreateCarService;
