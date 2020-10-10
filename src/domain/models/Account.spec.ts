import { deleteFile } from '../../infra/repositories/json/json-repository';
import { Account } from './Account';

describe('Account', () => {
  beforeAll(async () => await deleteFile('accounts'));
  afterAll(async () => await deleteFile('accounts'));

  test('Deve salvar um novo registro', async () => {
    const account = Account.init(1, 1020);
    const savedId = await account.save('accounts', account);
    const accountCreated = await Account.findById('accounts', savedId);
    expect(accountCreated).toEqual({ id: savedId, userId: 1, saldo: 1020 });
  });

  test('Deve atualizar o registro', async () => {
    const account = Account.init(1, 1025, 1);
    await account.update('accounts', account);
    const accountUpdated = await Account.findById('accounts', 1);
    expect(accountUpdated).toEqual({ id: 1, userId: 1, saldo: 1025 });
  });

  test('Deve listar todos os registro', async () => {
    const accounts = await Account.findAll('accounts');
    expect(accounts?.length).toBeGreaterThanOrEqual(0);
  });

  test('Deve excluir um registro', async () => {
    const acc = await Account.findById('accounts', 1);
    const account = Account.init(acc.userId, acc.saldo, acc.id);
    await account.delete('accounts', acc);
    const accDeleted = await Account.findById('accounts', 1);
    expect(accDeleted).toEqual({});
  });
});
