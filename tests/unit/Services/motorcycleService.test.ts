import { expect } from 'chai';
import sinon from 'sinon';
import { Model, Mongoose } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import {
  motorcycleResponse, motorcyclesArrayResponse, updatedMotorcycle } from './mocks/motorcyclesMock';
import ErrorHandler from '../../../src/errors';

describe('Deveria criar um motocicleta', function () {
  afterEach(function () { return sinon.restore(); });

  it('Deveria criar um motocicleta com sucesso', async function () {
    const MotorcycleInput: IMotorcycle = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 600,
    };
    const MotorcycleOutput: Motorcycle = new Motorcycle(
      MotorcycleInput,
    );

    sinon.stub(Model, 'create').resolves(MotorcycleOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.create(MotorcycleInput);

    // Assert
    expect(result).to.be.deep.equal(MotorcycleOutput);
  });

  it('Deveria retornar todos os motocicletas com sucesso', async function () {
    sinon.stub(Model, 'find').resolves(motorcyclesArrayResponse);

    // Act
    const service = new MotorcycleService();
    const result = await service.read();

    // Assert

    expect(result).to.be.deep.equal(motorcyclesArrayResponse);
  });

  it('Deveria retornar um motocicleta com sucesso', async function () {
    const id = '634852326b35b59438fbea2f';

    sinon.stub(Model, 'findOne').resolves(motorcycleResponse);

    // Act
    const service = new MotorcycleService();
    const result = await service.readOne(id);

    // Assert

    expect(result).to.be.deep.equal(motorcycleResponse);
  });

  it('Deveria retornar um id inválido', async function () {
    const id = '123456';

    const mongoose = new Mongoose();

    sinon.stub(Model, 'findOne').resolves(null);
    sinon.stub(mongoose, 'isValidObjectId').returns(false);

    // Act
    try {
      const service = new MotorcycleService();
      await service.readOne(id);
    } catch (error) {
      const { message } = error as ErrorHandler;
      // Assert
      expect(message).to.be.equal('Invalid mongo id');
    }
  });

  it('Deveria retornar um error moto não encontrada', async function () {
    const id = '634852326b35b59438fbea2f';

    const mongoose = new Mongoose();

    sinon.stub(mongoose, 'isValidObjectId').returns(true);
    sinon.stub(Model, 'findOne').resolves(null);

    // Act
    try {
      const service = new MotorcycleService();
      await service.readOne(id);
    } catch (error) {
      const { message } = error as ErrorHandler;
      // Assert
      expect(message).to.be.equal('Car not found');
    }
  });

  it('Consegue atualizar um carro com sucesso', async function () {
    const id = '634852326b35b59438fbea2f';
      
    sinon.stub(Model, 'findOneAndUpdate').resolves(motorcycleResponse);

    const service = new MotorcycleService();
    
    const result = await service.update(id, updatedMotorcycle);

    expect(result).to.be.deep.equal(motorcycleResponse);
  });

  it('Não consegue atualizar um motocicleta com sucesso', async function () {
    const id = '634852326b35b59438fbea2f';
      
    sinon.stub(Model, 'findOneAndUpdate').resolves(null);

    try {
      const service = new MotorcycleService();
      
      await service.update(id, updatedMotorcycle);
    } catch (error) {
      const { message } = error as ErrorHandler;
      expect(message).to.be.equal('Motorcycle not found');
    }
  });
  
  it('Não consegue atualizar um motocicleta com sucesso por causa do id', async function () {
    const id = '6348523f';

    try {
      const service = new MotorcycleService();
      
      await service.update(id, updatedMotorcycle);
    } catch (error) {
      const { message } = error as ErrorHandler;
      expect(message).to.be.equal('Invalid mongo id');
    }
  });
});
