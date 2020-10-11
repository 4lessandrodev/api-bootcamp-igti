import { createNewFile, deleteFile, verifyIfFileExists } from './utils/json-repository';

describe('Initi Data', () => {
  test('Deve retornar false se um arquivo json não existir', async () => {
    const exist = await verifyIfFileExists('not_exist_file');
    expect(exist).toBe(false);
  });

  test('Deve criar um arquivo se ele não existir', async () => {
    await createNewFile('account');
    const exist = await verifyIfFileExists('account');
    expect(exist).toBe(true);
  });

  test('Deve retornar true quando excluir um aqruivo existente', async () => {
    const deleted = await deleteFile('account');
    expect(deleted).toBe(true);
  });

  test('Deve retornar false quando tentar excluir um aqruivo inexistente', async () => {
    const deleted = await deleteFile('not_exist_file');
    expect(deleted).toBe(false);
  });
});
