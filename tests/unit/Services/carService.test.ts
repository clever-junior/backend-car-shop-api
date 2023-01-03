import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import { carResponse, carsArrayResponse } from './carsMock';

describe('Deveria criar um carro', function () {
  afterEach(function () { return sinon.restore(); });

  it('Deveria criar um carro com sucesso', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: Car = new Car(
      carInput,
    );

    sinon.stub(Model, 'create').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.create(carInput);

    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });
  
  it('Deveria naõ conseguir criar um carro', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'create').resolves(null);

    // Act
    const service = new CarService();
    const result = await service.create(carInput);

    // Assert
    expect(result).to.throw();
  });

  it('Deveria retornar todos os carros com sucesso', async function () {
    sinon.stub(Model, 'find').resolves(carsArrayResponse);

    // Act
    const service = new CarService();
    const result = await service.read();

    // Assert

    expect(result).to.be.deep.equal(carsArrayResponse);
  });

  it('Deveria retornar um carro com sucesso', async function () {
    const id = '634852326b35b59438fbea2f';

    sinon.stub(Model, 'findOne').resolves(carResponse);

    // Act
    const service = new CarService();
    const result = await service.readOne(id);

    // Assert

    expect(result).to.be.deep.equal(carResponse);
  });

  it('Deveria retornar um erro 404', async function () {
    const id = '634852326b35b59438fbea2g';

    sinon.stub(Model, 'findOne').resolves(null);

    // Act
    const service = new CarService();
    const result = await service.readOne(id);

    // Assert

    expect(result).to.throw(new Error('Invalid mongo id'));
  });
});
