import { findById, findAll, deleteGradeById, saveNewGrade, updateGradeById } from '../../infra/repositories/json/grade-repository';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { logger } from '../../infra/middlewares/loggerMiddleware';
import { Grade } from '../../domain/models/Grade';

const checkErrors = async (req:Request, res:Response) => {
  if (!validationResult(req).isEmpty()) {
    const errors = validationResult(req).array();
    res.status(422).json(errors);
    logger.http(`requisição recusada pela validação: ${JSON.stringify(errors)}`);
    return true;
  }
  return false;
};

export const gradeController = {
  findById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(await checkErrors(req, res))) {
        const id = parseInt(req.params.id);
        res.status(200).json(await Grade.findById('grades', id, { findById }));
      }
    } catch (error) {
      next(error);
    }
  },
  findAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await Grade.findAll('grades', { findAll }));
    } catch (error) {
      next(error);
    }
  },
  deleteGradeById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(await checkErrors(req, res))) {
        const id = parseInt(req.params.id);
        const { student, subject, type, value, timestamp } = req.body;
        const numberValue = parseFloat(value);
        const grade = Grade.init(student, subject, type, numberValue, timestamp, id);
        res.status(200).json(await grade.delete('grades', grade.id || 0, { deleteGradeById }));
      }
    } catch (error) {
      next(error);
    }
  },
  savaNewGrade: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(await checkErrors(req, res))) {
        const { student, subject, type, value, timestamp } = req.body;
        const numberValue = parseFloat(value);
        const grade = Grade.init(student, subject, type, numberValue, timestamp, null);
        const newGrade = await grade.save('grades', grade, { saveNewGrade });
        res.status(200).json(newGrade);
        logger.info(`Nova conta salva ${JSON.stringify(newGrade)}`);
      }
    } catch (error) {
      next(error);
    }
  },
  updateGradeById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(await checkErrors(req, res))) {
        const id = parseInt(req.params.id);
        const { student, subject, type, value, timestamp } = req.body;
        const numberValue = parseFloat(value);
        const grade = Grade.init(student, subject, type, numberValue, timestamp, id);
        const updatedGrade = await grade.update('grades', grade, { updateGradeById });
        res.status(200).json(updatedGrade);
        logger.info(`Grade atualizada ${JSON.stringify(updatedGrade)}`);
      }
    } catch (error) {
      next(error);
    }
  },

  calculateAvaregeGradeValue: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(await checkErrors(req, res))) {
        const { subject, type } = req.params;
        res.status(200).json(await Grade.calculateAvaregeGradeValue('grades', type, subject, { findAll }));
        logger.info(`Solicitado calculo da média ${JSON.stringify({ subject, type })}`);
      }
    } catch (error) {
      next(error);
    }
  },

  checkTotalGradeValueForOneStudent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(await checkErrors(req, res))) {
        const { student, subject } = req.params;
        res.status(200).json(await Grade.checkTotalGradeValueForOneStudent('grades', student, subject, { findAll }));
        logger.info(`Solicitado calculo da grade para o aluno ${JSON.stringify({ student, subject })}`);
      }
    } catch (error) {
      next(error);
    }
  },

  findBettersAvaregeGradeValue: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(await checkErrors(req, res))) {
        const { subject, type } = req.params;
        res.status(200).json(await Grade.findBettersAvaregeGradeValue('grades', type, subject, { findAll }));
        logger.info(`Solicitado calculo das três melhores grades ${JSON.stringify({ type, subject })}`);
      }
    } catch (error) {
      next(error);
    }
  }
};
