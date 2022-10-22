export interface IService<T> {
  create(obj:T):Promise<T>,
  readOne(_id:string):Promise<T | null>,
  update(_id:string, obj: Partial<T>):Promise<T | null>,
  read():Promise<T[] | null>,
  delete(_id:string):Promise<T | null>,
}