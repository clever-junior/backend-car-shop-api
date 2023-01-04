import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  get getCategory() { return this.category; }

  get getEngineCapacity() { return this.engineCapacity; }

  constructor(props: IMotorcycle) {
    super(props);
    this.category = props.category;
    this.engineCapacity = props.engineCapacity;
  }
}
