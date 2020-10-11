import { writeFileSync, existsSync, unlinkSync } from 'fs';
import path from 'path';
import { env } from '../../../config/env';

export const verifyIfFileExists = async (filename: string):Promise<boolean> => {
  return existsSync(path.join('.', 'src', 'infra', 'data', `${filename}.json`));
};

export const createNewFile = async (filename: string): Promise<void> => {
  if (!(await verifyIfFileExists(filename))) {
    writeFileSync(path.join('.', 'src', 'infra', 'data', `${filename}.json`), JSON.stringify({ defaultData: env.defaultData }), 'utf-8');
  }
};

export const deleteFile = async (filename: string):Promise<boolean> => {
  if ((await verifyIfFileExists(filename))) {
    unlinkSync(path.join('.', 'src', 'infra', 'data', `${filename}.json`));
    return true;
  }
  return false;
};

export const reWriteFile = async (filename:string, defaultData: Array<object>) => {
  writeFileSync(path.join('.', 'src', 'infra', 'data', `${filename}.json`), JSON.stringify({ defaultData }, null, 2), 'utf-8');
};
