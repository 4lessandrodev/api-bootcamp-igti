import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs';
import path from 'path';
import { env } from '../config/env';
import { IDefaultData } from './IDefaultData';

export const verifyIfFileExists = async (filename: string):Promise<boolean> => {
  return existsSync(path.join('.', 'src', 'infra', 'data', `${filename}.json`));
};

export const createNewFile = async (filename: string, defaultData: Array<object>): Promise<void> => {
  if (!(await verifyIfFileExists(filename))) {
    writeFileSync(path.join('.', 'src', 'infra', 'data', `${filename}.json`), JSON.stringify({ defaultData }), 'utf-8');
  }
};

export const deleteFile = async (filename: string):Promise<boolean> => {
  if ((await verifyIfFileExists(filename))) {
    unlinkSync(path.join('.', 'src', 'infra', 'data', `${filename}.json`));
    return true;
  }
  return false;
};

export const readFile = async (filename: string): Promise<Array<IDefaultData>> => {
  if ((await verifyIfFileExists(filename))) {
    const _filename = path.join('.', 'src', 'infra', 'data', `${filename}.json`);
    const object = JSON.parse(readFileSync(_filename, 'utf-8'));
    return object.defaultData;
  }
  return env.defaultData;
};

export const updateDataFile = async (filename:string, data:any):Promise<any> => {
  if ((await verifyIfFileExists(filename))) {
    const file = await readFile(filename);
    const index = file[0].data.findIndex((register) => register.id === data.id);
    if (index !== -1) {
      file[0].data[index] = data;
      await reWriteFile(filename, file);
      return file[0].data[index];
    }
  }
};

export const reWriteFile = async (filename:string, defaultData: Array<object>) => {
  writeFileSync(path.join('.', 'src', 'infra', 'data', `${filename}.json`), JSON.stringify({ defaultData }), 'utf-8');
};

export const savaNewDataOnFile = async (filename: string, data: any): Promise<number> => {
  if ((await verifyIfFileExists(filename))) {
    const file = await readFile(filename);
    data.id = file[0].nextId;
    file[0].nextId = sumId(file);
    file[0].data.push(data);

    await reWriteFile(filename, file);
    return data.id;
  } else {
    await createNewFile(filename, env.defaultData);
    const file = await readFile(filename);
    data.id = file[0].nextId;
    file[0].nextId = sumId(file);
    file[0].data.push(data);

    await reWriteFile(filename, file);
    return data.id;
  }
};

export const deleteDataOnFile = async (filename:string, data:any):Promise<any> => {
  if ((await verifyIfFileExists(filename))) {
    const file = await readFile(filename);
    const jsonRegisters = file[0].data;
    const indexRegisterToDelete = jsonRegisters.findIndex((register) => register.id === data.id);
    if (indexRegisterToDelete !== -1) {
      jsonRegisters.splice(indexRegisterToDelete, 1);
      file[0].nextId = minusId(file);
      await reWriteFile(filename, file);
    }
  }
};

export const findRegisterById = async (filename:string, id:number):Promise<any> => {
  if ((await verifyIfFileExists(filename))) {
    const file = await readFile(filename);
    const jsonRegisters = file[0].data;
    const register = jsonRegisters.find((register) => register.id === id);
    if (register) {
      return register;
    }
    return {};
  }
};

export const findRegistes = async (filename:string):Promise<Array<any>> => {
  if ((await verifyIfFileExists(filename))) {
    const file = await readFile(filename);
    return file[0].data;
  }
  return [];
};

export const minusId = (file:Array<IDefaultData>):number => {
  if (file[0].nextId === 1) {
    return 1;
  } else {
    return file[0].nextId + 1;
  };
};

const sumId = (file: Array<IDefaultData>): number => {
  return file[0].nextId + 1;
};
