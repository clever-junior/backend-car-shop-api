import { expect } from 'chai';
import sinon from 'sinon';
import { Model, Mongoose } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import {
  carResponse,
  carsArrayResponse,
} from './mocks/carsMock';
import ErrorHandler from '../../../src/errors';

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

  it('Deveria retornar um id inválido', async function () {
    const id = '123456';

    const mongoose = new Mongoose();

    sinon.stub(Model, 'findOne').resolves(null);
    sinon.stub(mongoose, 'isValidObjectId').returns(false);

    // Act
    try {
      const service = new CarService();
      await service.readOne(id);
    } catch (error) {
      const { message } = error as ErrorHandler;
      // Assert
      expect(message).to.be.equal('Invalid mongo id');
    }
  });

  it('Deveria retornar um error carro não encontrado', async function () {
    const id = '634852326b35b59438fbea2f';

    const mongoose = new Mongoose();

    sinon.stub(mongoose, 'isValidObjectId').returns(true);
    sinon.stub(Model, 'findOne').resolves(null);

    // Act
    try {
      const service = new CarService();
      await service.readOne(id);
    } catch (error) {
      const { message } = error as ErrorHandler;
      // Assert
      expect(message).to.be.equal('Car not found');
    }
  });

  it('Consegue atualizar um carro com sucesso', async function () {
    const id = '634852326b35b59438fbea2f';

    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
      
    sinon.stub(Model, 'findOneAndUpdate').resolves(carResponse);

    const service = new CarService();
    
    const result = await service.update(id, carInput);

    expect(result).to.be.deep.equal(carResponse);
  });

  it('Não consegue atualizar um carro com sucesso', async function () {
    const id = '634852326b35b59438fbea2f';

    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
      
    sinon.stub(Model, 'findOneAndUpdate').resolves(null);

    try {
      const service = new CarService();
      
      await service.update(id, carInput);
    } catch (error) {
      const { message } = error as ErrorHandler;
      expect(message).to.be.equal('Car not found');
    }
  });
  
  it('Não consegue atualizar um carro com sucesso por causa do id', async function () {
    const id = '6348523f';

    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    try {
      const service = new CarService();
      
      await service.update(id, carInput);
    } catch (error) {
      const { message } = error as ErrorHandler;
      expect(message).to.be.equal('Invalid mongo id');
    }
  });
});
