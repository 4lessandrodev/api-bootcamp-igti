import { readFileSync } from 'fs';
import path from 'path';
import { IAccount } from '../../../domain/interfaces/IAccount';
import { env } from '../../config/env';
import { IDefaultAccountData } from './utils/IDefaultAccount';
import { createNewFile, reWriteFile, verifyIfFileExists } from './utils/json-repository';

export const findAll = async (filename: string): Promise<Array<IDefaultAccountData>> => {
  if ((await verifyIfFileExists(filename))) {
    const _filename = path.join('.', 'src', 'infra', 'data', `${filename}.json`);
    const object = JSON.parse(readFileSync(_filename, 'utf-8'));
    return object.defaultData;
  }
  return env.defaultData;
};

export const saveNewAccount = async (filename: string, data: IAccount): Promise<IAccount> => {
  const makeAccount = async (filename:string): Promise<IAccount> => {
    const accounts = await findAll(filename);
    data.id = accounts[0].nextId++;
    accounts[0].data.push(data);
    await reWriteFile(filename, accounts);
    return data;
  };
  if ((await verifyIfFileExists(filename))) {
    return makeAccount(filename);
  }
  await createNewFile(filename);
  return await makeAccount(filename);
};

export const findById = async (filename:string, _id:number): Promise<IAccount|null> => {
  const accounts = await findAll(filename);
  const account = accounts[0].data.find((_account) => _account.id === _id);
  if (account) {
    return account;
  }
  return null;
};

export const updateAccountById = async (filename: string, account: IAccount): Promise<IAccount|null> => {
  const accounts = await findAll(filename);
  const hasAccount = accounts[0].data.findIndex((acc) => acc.id === account.id);
  if (hasAccount !== -1) {
    accounts[0].data[hasAccount] = account;
    await reWriteFile(filename, accounts);
    return account;
  }
  return null;
};

export const deleteAccountById = async (filename: string, id: number): Promise<boolean> => {
  const accounts = await findAll(filename);
  const hasAccount = accounts[0].data.findIndex((account) => account.id === id);
  if (hasAccount !== -1) {
    accounts[0].data.splice(hasAccount, 1);
    await reWriteFile(filename, accounts);
    return true;
  }
  return false;
};
