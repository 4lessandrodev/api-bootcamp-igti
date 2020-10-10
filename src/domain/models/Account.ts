import {
  deleteDataOnFile,
  findRegisterById,
  findRegistes,
  savaNewDataOnFile,
  updateDataFile
} from '../../infra/middlewares/initData';
import { EntityMethos } from '../interfaces/EntityMethods';

export class Account implements EntityMethos {
 private readonly id: number;
 private readonly userId: number;
 private readonly saldo: number
 constructor (id: number, userId:number, saldo:number) {
   this.id = id;
   this.userId = userId;
   this.saldo = saldo;
 }

 async update (filename: string, account: this): Promise<void> {
   await updateDataFile(filename, account);
 }

 async save (filename: string, account: this): Promise<void> {
   await savaNewDataOnFile(filename, account);
 }

 async delete (filename: string, account: this): Promise<void> {
   await deleteDataOnFile(filename, account);
 }

 async findById (filename: string, account: this): Promise<this | any> {
   await findRegisterById(filename, account);
 }

 async findAll (filename: string): Promise<this[] | any> {
   await findRegistes(filename);
 }
}
