import express from 'express';
import { accountController } from '../controller/accountController';
const router = express.Router();

router.get('/', accountController.findAll);
router.get('/:id', accountController.findById);
router.delete('/:id', accountController.deleteAccountById);
router.put('/:id', accountController.updateAccountById);
router.post('/', accountController.savaNewAccount);

export default router;
