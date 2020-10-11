import express from 'express';
import { accountController } from '../controller/accountController';
import { validation } from '../../domain/validations/account-validations';
const router = express.Router();

router.get('/', accountController.findAll);

router.get('/:id', validation.isID(), accountController.findById);

router.delete('/:id', validation.isID(), accountController.deleteAccountById);

router.put('/:id',
  validation.isID(),
  validation.saldoIsNumber(),
  validation.userIsString(), accountController.updateAccountById);

router.post('/', validation.saldoIsNumber(),
  validation.userIsString(), accountController.savaNewAccount);

export default router;
