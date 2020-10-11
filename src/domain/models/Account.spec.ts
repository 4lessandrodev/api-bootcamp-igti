
import { saveNewAccount, findById, updateAccountById, findAll, deleteAccountById } from '../../infra/repositories/json/account-repository';
import { deleteFile } from '../../infra/repositories/json/utils/json-repository';
import { Account } from './Account';

describe('Account', () => {
  beforeAll(async () => await deleteFile('accounts'));
  afterAll(async () => await deleteFile('accounts'));

  test('Deve salvar um novo registro', async () => {
    const account = Account.init('Alessandro', 17200, 1);
    const savedData = await account.save('accounts', account, { saveNewAccount });
    const accountCreated = await Account.findById('accounts', savedData.id, { findById });
    expect(accountCreated).toEqual({ id: savedData.id, user: 'Alessandro', saldo: 17200 });
  });

  test('Deve atualizar o registro', async () => {
    const account = Account.init('Luan Jean', 50250, 1);
    const accountUpdated = await account.update('accounts', account, { updateAccountById });
    expect(accountUpdated).toEqual({ id: 1, user: 'Luan Jean', saldo: 50250 });
  });

  test('Deve buscar um registro pelo id', async () => {
    const accountUpdated = await Account.findById('accounts', 1, { findById });
    expect(accountUpdated).toEqual({ id: 1, user: 'Luan Jean', saldo: 50250 });
  });

  test('Deve retornar nulo se tentar buscar um registro que não existe', async () => {
    const notExistAccount = await Account.findById('accounts', 1000, { findById });
    expect(notExistAccount).toEqual(null);
  });

  test('Deve listar todos os registro', async () => {
    const accounts = await Account.findAll('accounts', { findAll });
    expect(accounts?.length).toBeGreaterThanOrEqual(0);
  });

  test('Deve excluir um registro', async () => {
    const acc = await Account.findById('accounts', 1, { findById });
    expect(acc).not.toBeNull();
    if (acc) {
      const account = Account.init(acc?.user, acc?.saldo, acc?.id);
      await account.delete('accounts', acc?.id, { deleteAccountById });
      const accDeleted = await Account.findById('accounts', 1, { findById });
      expect(accDeleted).toBeNull();
    }
  });
});
