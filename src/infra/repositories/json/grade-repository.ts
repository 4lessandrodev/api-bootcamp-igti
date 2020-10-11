import { readFileSync } from 'fs';
import path from 'path';
import { IGrade } from '../../../domain/interfaces/IGrade';
import { env } from '../../config/env';
import { IDefaultGradetData } from './utils/IDefaultGrade';
import { createNewFile, reWriteFile, verifyIfFileExists } from './utils/json-repository';

export const findAll = async (filename: string): Promise<Array<IDefaultGradetData>> => {
  if ((await verifyIfFileExists(filename))) {
    const _filename = path.join('.', 'src', 'infra', 'data', `${filename}.json`);
    const object = JSON.parse(readFileSync(_filename, 'utf-8'));
    return object.defaultData;
  }
  return env.defaultData;
};

export const saveNewGrade = async (filename: string, data: IGrade): Promise<IGrade> => {
  const makeGrade = async (filename:string): Promise<IGrade> => {
    const grades = await findAll(filename);
    data.id = grades[0].nextId++;
    grades[0].data.push(data);
    await reWriteFile(filename, grades);
    return data;
  };
  if ((await verifyIfFileExists(filename))) {
    return makeGrade(filename);
  }
  await createNewFile(filename);
  return await makeGrade(filename);
};

export const findById = async (filename:string, _id:number): Promise<IGrade|null> => {
  const grades = await findAll(filename);
  const grade = grades[0].data.find((_grade) => _grade.id === _id);
  if (grade) {
    return grade;
  }
  return null;
};

export const updateGradeById = async (filename: string, grade: IGrade): Promise<IGrade|null> => {
  const grades = await findAll(filename);
  const hasGrade = grades[0].data.findIndex((acc) => acc.id === grade.id);
  if (hasGrade !== -1) {
    grades[0].data[hasGrade] = grade;
    await reWriteFile(filename, grades);
    return grade;
  }
  return null;
};

export const deleteGradeById = async (filename: string, id: number): Promise<boolean> => {
  const grades = await findAll(filename);
  const hasGrade = grades[0].data.findIndex((grade) => grade.id === id);
  if (hasGrade !== -1) {
    grades[0].data.splice(hasGrade, 1);
    await reWriteFile(filename, grades);
    return true;
  }
  return false;
};
