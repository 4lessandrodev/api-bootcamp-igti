import { findById, findAll, deleteAccountById, saveNewAccount, updateAccountById } from '../../infra/repositories/json/account-repository';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { logger } from '../../infra/middlewares/loggerMiddleware';
import { Account } from '../../domain/models/Account';

const checkErrors = async (req:Request, res:Response) => {
  if (!validationResult(req).isEmpty()) {
    const errors = validationResult(req).array();
    res.status(422).json(errors);
    logger.http(`requisição recusada pela validação: ${JSON.stringify(errors)}`);
    return true;
  }
  return false;
};

export const accountController = {
  findById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(await checkErrors(req, res))) {
        const id = parseInt(req.params.id);
        res.status(200).json(await Account.findById('accounts', id, { findById }));
      }
    } catch (error) {
      next(error);
    }
  },
  findAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await Account.findAll('accounts', { findAll }));
    } catch (error) {
      next(error);
    }
  },
  deleteAccountById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(await checkErrors(req, res))) {
        const id = parseInt(req.params.id);
        const { user, saldo } = req.body;
        const account = Account.init(user, saldo, id);
        res.status(200).json(await account.delete('accounts', account.id, { deleteAccountById }));
      }
    } catch (error) {
      next(error);
    }
  },
  savaNewAccount: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(await checkErrors(req, res))) {
        const { user, saldo } = req.body;
        const numberSaldo = parseFloat(saldo);
        const account = Account.init(user, numberSaldo, 0);
        const newAccount = await account.save('accounts', account, { saveNewAccount });
        res.status(200).json(newAccount);
        logger.info(`Nova conta salva ${JSON.stringify(newAccount)}`);
      }
    } catch (error) {
      next(error);
    }
  },
  updateAccountById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(await checkErrors(req, res))) {
        const id = parseInt(req.params.id);
        const { user, saldo } = req.body;
        const numberSaldo = parseFloat(saldo);
        const account = Account.init(user, numberSaldo, id);
        const updatedAccount = await account.update('accounts', account, { updateAccountById });
        res.status(200).json(updatedAccount);
        logger.info(`Account atualizada ${JSON.stringify(updatedAccount)}`);
      }
    } catch (error) {
      next(error);
    }
  }
};
