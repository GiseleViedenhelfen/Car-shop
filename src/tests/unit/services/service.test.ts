// template para criação dos testes de cobertura da camada de service
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarService from '../../../services/CarService';
import CarModel from '../../../models/CarModel';
import { carMock, carMockWithId } from '../../mocks/carMock';
import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;

describe('testa a camada service de carros', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);
  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('cria um carro', ()=> {
    it('e cria corretamente', async() => {
      const carroCriado = await carService.create(carMock);
      expect(carroCriado).to.be.deep.equal(carMockWithId);
    });

		it('e falha se é passado um objeto vazio', async () => {
			let error;

			try {
				await carService.create({});
			} catch (err) {
				error = err;
			}

			expect(error).to.be.instanceOf(ZodError);
		});
  })
  describe('buscando carro por Id', () => {
    it('e encontra', async () => {
      const carroProcurado = await carService.readOne('62cf1fc6498565d94eba52cd');
			expect(carroProcurado).to.be.deep.equal(carMockWithId);
    });
    it('e caso não encontre', async () => {
			let error;
			try {
				await carService.readOne(carMockWithId._id);
			} catch (err:any) {
				error = err;
			}
			expect(error?.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
  })
  describe('atualizando um carro', () => {
    it('e atualiza corretamente', async () => {
      sinon.stub(carModel, 'update').resolves(carMockWithId);
      const updated = await carService.update('any-id', carMock);
      expect(updated).to.be.deep.eq(carMockWithId);

			sinon.restore();
    })
    it('e caso nao consiga atualizar - Zod', async () => {
			let error;

			try {
				await carService.update('any-id', { INVALID: "OBJECT" })
			} catch(err) {
				error = err;
			}

			expect(error).to.be.instanceOf(ZodError)
		})
    it('caso não consiga - carro não encontrado', async () => {
			sinon.stub(carModel, 'update').resolves(null);
			let error: any;

			try {
				await carService.update('any-id', carMock)
			} catch(err) {
				error = err;
			}

			expect(error?.message).to.be.eq(ErrorTypes.EntityNotFound)
		})
  })
});