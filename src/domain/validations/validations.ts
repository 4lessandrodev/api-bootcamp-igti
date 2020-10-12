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
  },
  validateAllFieldGradeBody: () => {
    return [
      check('student', 'Informe o nome do aluno, 3 a 40 caracteres').isLength({ min: 3, max: 40 }),
      check('subject', 'Informe o assunto 3 a 40 caracteres').isLength({ min: 3, max: 40 }),
      check('type', 'Informe o tipo de avaliação 3 a 40 caracteres').isLength({ min: 3, max: 40 }),
      check('timestamp', 'Informe uma data e hora no formato ISO8601').isISO8601(),
      check('value', 'Informe um valor numérico para nota').isNumeric()
    ];
  },
  validateSubjectAndStudent: () => {
    return (
      [
        param('subject', 'Informe um subject').isLength({ min: 2, max: 40 }),
        param('student', 'Informe um student').isLength({ min: 2, max: 40 })
      ]
    );
  },
  validateTypeAndSubject: () => {
    return (
      [
        param('subject', 'Informe um subject').isLength({ min: 2, max: 40 }),
        param('type', 'Informe um type').isLength({ min: 2, max: 40 })
      ]
    );
  }
};
