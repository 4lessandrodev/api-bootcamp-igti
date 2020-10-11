import { IAccount } from '../../../domain/interfaces/IAccount';
import { IDefaultData } from '../json/utils/IDefaultData';

export interface IDeleteAccountRepository{
deleteAccountById (filename: string, id: number): Promise<boolean>
}

export interface IUpdateAccountRepository {
 updateAccountById(filename: string, account: IAccount): Promise<IAccount | null>
}

export interface ISaveAccountRepository{
 saveNewAccount(filename: string, data: IAccount): Promise<IAccount>
}

export interface IFindAllAccountsRepository {
findAll(filename:string):Promise<Array<IDefaultData>>
}

export interface IFindByIdAccountRepository{
 findById(filename:string, _id:number): Promise<IAccount|null>
}
