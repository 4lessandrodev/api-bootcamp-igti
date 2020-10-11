import { findById, findAll, deleteAccountById, saveNewAccount, updateAccountById } from '../../infra/repositories/json/account-repository';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { logger } from '../../infra/middlewares/loggerMiddleware';

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
        res.status(200).json(await findById('accounts', id));
      }
    } catch (error) {
      next(error);
    }
  },
  findAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await findAll('accounts');
      res.status(200).json(data[0].data);
    } catch (error) {
      next(error);
    }
  },
  deleteAccountById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(await checkErrors(req, res))) {
        const id = parseInt(req.params.id);
        res.status(200).json(await deleteAccountById('accounts', id));
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
        const newAccount = await saveNewAccount('accounts', { user, saldo: numberSaldo, id: 0 });
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
        const updatadeAccount = await updateAccountById('accounts', { user, saldo: numberSaldo, id });
        res.status(200).json(updatadeAccount);
        logger.info(`Account atualizada ${JSON.stringify(updatadeAccount)}`);
      }
    } catch (error) {
      next(error);
    }
  }
};
