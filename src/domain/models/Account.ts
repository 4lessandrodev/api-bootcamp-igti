import {
  deleteDataOnFile,
  findRegisterById,
  findRegistes,
  savaNewDataOnFile,
  updateDataFile
} from '../../infra/repositories/json/json-repository';
import { EntityMethods } from '../interfaces/EntityMethods';

export class Account implements EntityMethods {
  private readonly id: number|null|undefined;
  private readonly userId: number;
  private readonly saldo: number
  private constructor (userId:number, saldo:number, id?: number) {
    this.id = id;
    this.userId = userId;
    this.saldo = saldo;
  }

  static init (userId:number, saldo:number, id?: number) {
    return new Account(userId, saldo, id);
  }

  async update (filename: string, account: this): Promise<void> {
    await updateDataFile(filename, account);
  }

  async save (filename: string, account: this): Promise<number> {
    return await savaNewDataOnFile(filename, account);
  }

  async delete (filename: string, account: this): Promise<void> {
    await deleteDataOnFile(filename, account);
  }

  static async findAll (filename: string):Promise<Array<any>> {
    return await findRegistes(filename);
  }

  static async findById (filename: string, id:number): Promise<any> {
    return await findRegisterById(filename, id);
  }
}
