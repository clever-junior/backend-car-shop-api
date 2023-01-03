import ICar from '../Interfaces/ICar';

export default class Car {
  protected id?: string;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;
  
  // get getId() { return this.id; }
  
  // get getModel() { return this.model; }
  
  // get getYear() { return this.year; }
  
  // get getColor() { return this.color; }
  
  // get getStatus() { return this.status; }
  
  // get getBuyValue() { return this.buyValue; }
  
  // get doors() { return this.doorsQty; }

  // get seats() { return this.seatsQty; }

  constructor(props: ICar) {
    this.id = props._id;
    this.model = props.model;
    this.year = props.year;
    this.color = props.color;
    this.status = props.status;
    this.buyValue = props.buyValue;
    this.doorsQty = props.doorsQty;
    this.seatsQty = props.seatsQty;
  }
}
