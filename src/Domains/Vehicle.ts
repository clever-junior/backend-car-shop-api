import IVehicle from '../Interfaces/IVehicle';

export default class Vehicle {
  protected id?: string;
  protected model: string;
  protected year: number;
  protected status?: boolean;
  protected color: string;
  protected buyValue: number;

  constructor({ id, model, year, status, color, buyValue }: IVehicle) {
    this.id = id;
    this.model = model;
    this.year = year;
    this.status = status;
    this.color = color;
    this.buyValue = buyValue;
  }
}