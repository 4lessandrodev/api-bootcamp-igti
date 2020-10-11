import { IAccountMethods } from '../interfaces/IAccountMethods';
import { IAccount } from '../interfaces/IAccount';
import { IDeleteAccountRepository, IFindAllAccountsRepository, IFindByIdAccountRepository, ISaveAccountRepository, IUpdateAccountRepository } from '../../infra/repositories/interfaces/IAccountRepository';

export class Account implements IAccountMethods {
  public id: number;
  public user: string;
  public saldo: number
  private constructor (user:string, saldo:number, id: number) {
    this.id = id;
    this.user = user;
    this.saldo = saldo;
  }

  static init (user:string, saldo:number, id: number) {
    return new Account(user, saldo, id);
  }

  async update (filename: string, account: IAccount, controller:IUpdateAccountRepository): Promise<IAccount | null> {
    return await controller.updateAccountById(filename, account);
  }

  async save (filename: string, account: IAccount, controller:ISaveAccountRepository): Promise<IAccount> {
    return await controller.saveNewAccount(filename, account);
  }

  async delete (filename: string, id:number, controller:IDeleteAccountRepository): Promise<void> {
    await controller.deleteAccountById(filename, id);
  }

  static async findAll (filename: string, controller:IFindAllAccountsRepository):Promise<Array<IAccount>> {
    const register = await controller.findAll(filename);
    return register[0].data;
  }

  static async findById (filename: string, id:number, controller:IFindByIdAccountRepository): Promise<IAccount|null> {
    return await controller.findById(filename, id);
  }
}
