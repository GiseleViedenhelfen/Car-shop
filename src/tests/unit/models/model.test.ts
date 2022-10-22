// template para criação dos testes de cobertura da camada de model
import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import { ErrorTypes } from '../../../errors/catalog';
import { carMock, carMockWithId, carMockForChange, carMockForChangeWithId } from '../../mocks/carMock';

const { expect } = chai;

describe('testa a model de carros', () => {
  const carModel = new CarModel();
  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockForChangeWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('criando carro', () => {
    it('cria corretamente', async () => {
      const carro = await carModel.create(carMock);
      expect(carro).to.be.deep.equal(carMockWithId);
    });
  })
  describe('procura um carro por id', () => {
    it('e encontra', async () => {
      const carroEncontrado = await carModel.readOne('62cf1fc6498565d94eba52cd');
			expect(carroEncontrado).to.be.deep.equal(carMockWithId);
    });
    it('e caso nao encontre', async () => {
      try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
    })
  })
  describe('altera os dados de um carro', () => {
    it('altera corretamente', async () => {
      const carroAlterado = await carModel.update('62cf1fc6498565d94eba52cd', carMockForChange);
			expect(carroAlterado).to.be.deep.equal(carMockForChangeWithId);
    })
    it('caso nao encontre o id para alterar', async() => {
      try {
				await carModel.update('123ERRADO', carMockForChange);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
    })
  })
});