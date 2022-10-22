import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { ICar, carZodSchema } from '../interfaces/ICar';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:unknown):Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(parsed.data);
  }
  
  public async readOne(_id:string):Promise<ICar> {
    const lerId = await this._car.readOne(_id);
    if (!lerId) throw new Error(ErrorTypes.EntityNotFound);
    return lerId;
  }
  public async update(_id: string, obj: unknown): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const updated = await this._car.update(_id, parsed.data);

    if (!updated) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return updated;
  }
  public async delete(_id: string):Promise<ICar> {
    const deleted = await this._car.delete(_id);
    if (!deleted) throw new Error(ErrorTypes.EntityNotFound);
    return deleted;
  }

  public async read(): Promise<ICar[]> {
    const documentos = await this._car.read();
    if (!documentos) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return documentos;
  }
}
export default CarService;