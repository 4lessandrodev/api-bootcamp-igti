import { findById, findAll, deleteAccountById, saveNewAccount, updateAccountById } from '../../infra/repositories/json/account-repository';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const checkErrors = async (req:Request, res:Response) => {
  if (!validationResult(req).isEmpty()) {
    const errors = validationResult(req).array();
    res.status(422).json(errors);
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
      console.log(error);
      res.status(500).json(error.message);
    }
  },
  findAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await findAll('accounts');
      res.status(200).json(data[0].data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  },
  deleteAccountById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(await checkErrors(req, res))) {
        const id = parseInt(req.params.id);
        res.status(200).json(await deleteAccountById('accounts', id));
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  },
  savaNewAccount: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(await checkErrors(req, res))) {
        const { user, saldo } = req.body;
        const numberSaldo = parseFloat(saldo);
        res.status(200).json(await saveNewAccount('accounts', { user, saldo: numberSaldo, id: 0 }));
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  },
  updateAccountById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(await checkErrors(req, res))) {
        const id = parseInt(req.params.id);
        const { user, saldo } = req.body;
        const numberSaldo = parseFloat(saldo);
        res.status(200).json(await updateAccountById('accounts', { user, saldo: numberSaldo, id }));
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
};
