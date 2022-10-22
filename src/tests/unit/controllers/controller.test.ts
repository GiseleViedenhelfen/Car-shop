// template para criação dos testes de cobertura da camada de controller

import { Request, Response } from 'express';
import * as sinon from 'sinon';
import chai from 'chai';
import CarController from '../../../controllers/carController';
import CarService from '../../../services/CarService';
import CarModel from '../../../models/CarModel';
import { carMock, carMockWithId } from '../../mocks/carMock';
const { expect } = chai;

describe('testa a controller de carro', () => {
  const carModel = new CarModel();
	const carService = new CarService(carModel);
  const carController = new CarController(carService);
   const req = {} as Request;
   const res = {} as Response;
   beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore()
  })
  describe('cria um carro', () => {
    beforeEach(() => {
      sinon.stub(carService, 'create').resolves(carMock);
    });
    it('cria corretamente', async () => {
      req.body = carMock;
      await carController.create(req, res);
      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(201)).to.be.true;
    });
  });
  describe('procura carro por id', () => {
    beforeEach(() => {
      sinon.stub(carService, 'readOne').resolves(carMock);
    });
    it('e encontra', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });
  describe('atualiza carro por id', () => {
    it('e atualiza corretamente', async () => {
      sinon.stub(carService, 'update').resolves(carMockWithId)

      await carController.update(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    })
  })
});