import { ICar } from "../../interfaces/ICar"

const carMock:ICar = {
  model: 'Corcel',
  year: 1970,
  color: 'azul',
  buyValue: 2000,
  doorsQty: 2,
  seatsQty: 5
}
const carMockWithId:ICar & { _id:string } = {
	_id: '62cf1fc6498565d94eba52cd',
  model: 'Corcel',
  year: 1970,
  color: 'azul',
  buyValue: 2000,
  doorsQty: 2,
  seatsQty: 5
};

const carMockForChange:ICar = {
  model: 'Corcel',
  year: 1970,
  color: 'ciano',
  buyValue: 2000,
  doorsQty: 2,
  seatsQty: 5
};
const carMockForChangeWithId:ICar & { _id:string } = {
	_id: '62cf1fc6498565d94eba52cd',
  model: 'Corcel',
  year: 1970,
  color: 'ciano',
  buyValue: 2000,
  doorsQty: 2,
  seatsQty: 5
};

export { carMock, carMockWithId, carMockForChange, carMockForChangeWithId }