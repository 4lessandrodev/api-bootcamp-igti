import {
  createNewFile, deleteFile, verifyIfFileExists,
  readFile, reWriteFile, savaNewDataOnFile, findRegistes, minusId
} from './json-repository';
import { env } from '../../config/env';

describe('Initi Data', () => {
  test('Deve retornar false se um arquivo json não existir', async () => {
    const exist = await verifyIfFileExists('not_exist_file');
    expect(exist).toBe(false);
  });

  test('Deve criar um arquivo se ele não existir', async () => {
    await createNewFile('account', env.defaultData);
    const exist = await verifyIfFileExists('account');
    expect(exist).toBe(true);
  });

  test('Deve reescrever os valores de um arquivo', async () => {
    await reWriteFile('account', [{ text: 'hello world' }]);
    const dataRewrote = await readFile('account');
    expect(dataRewrote).toEqual([{ text: 'hello world' }]);
  });

  test('Deve retornar true quando excluir um aqruivo existente', async () => {
    const deleted = await deleteFile('account');
    expect(deleted).toBe(true);
  });

  test('Deve retornar false quando tentar excluir um aqruivo inexistente', async () => {
    const deleted = await deleteFile('not_exist_file');
    expect(deleted).toBe(false);
  });

  test('Deve retornar um array padrão se o tentar ler um arquivo inexistente ', async () => {
    const readDefaultData = await readFile('not_exist_file');
    expect(readDefaultData).toEqual(env.defaultData);
  });

  test('Deve criar um novo arquivo se tentar salvar um registro em arquivo inexistente', async () => {
    await createNewFile('default', env.defaultData);
    const createdId = await savaNewDataOnFile('default', { text: 'Hello World', id: null });
    expect(createdId).toBeGreaterThan(0);
  });

  test('Deve retornar um array vazio se o arquivo não existir', async () => {
    const createdId = await findRegistes('file_not_exist');
    expect(createdId).toEqual([]);
  });

  test('Se eu tentar diminuir um número em array vazio, deve retornar o id 1', async () => {
    const id = minusId(env.defaultData);
    expect(id).toEqual(1);
  });
});
