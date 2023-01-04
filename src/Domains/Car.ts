import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;
  
  get doors() { return this.doorsQty; }

  get seats() { return this.seatsQty; }

  constructor(props: ICar) {
    super(props);
    this.doorsQty = props.doorsQty;
    this.seatsQty = props.seatsQty;
  }
}
