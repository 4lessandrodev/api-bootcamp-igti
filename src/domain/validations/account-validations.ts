import { check, param } from 'express-validator';

export const validation = {
  isID: () => {
    return (
      [
        param('id', 'Informe um id numérico').isNumeric()
      ]
    );
  },
  saldoIsNumber: () => {
    return (
      [
        check('saldo', 'informe um saldo numérico').isNumeric()
      ]
    );
  },
  userIsString: () => {
    return (
      [
        check('user', 'Informe um nome em string entre 5 e 20 caracteres').isLength({ min: 3, max: 20 })
      ]
    );
  }
};
