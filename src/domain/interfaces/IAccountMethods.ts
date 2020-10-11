import { IDeleteAccountRepository, ISaveAccountRepository, IUpdateAccountRepository } from '../../infra/repositories/interfaces/IAccountRepository';
import { IAccount } from './IAccount';

export interface IAccountMethods{
 update(filename: string, element: IAccount, controller: IUpdateAccountRepository): Promise<IAccount | null>
 save(filename: string, element: IAccount, controller:ISaveAccountRepository): Promise<IAccount>
 delete(filename: string, id: number, controller: IDeleteAccountRepository): Promise<void>
}
