import express from 'express';
import { gradeController } from '../controller/gradeController';
import { validation } from '../../domain/validations/validations';
const router = express.Router();

router.get('/', gradeController.findAll);

router.get('/:id', validation.isID(), gradeController.findById);

router.delete('/:id', validation.isID(), gradeController.deleteGradeById);

router.put('/:id',
  validation.isID(),
  validation.validateAllFieldGradeBody(), gradeController.updateGradeById);

router.post('/', validation.validateAllFieldGradeBody(), gradeController.savaNewGrade);

export default router;
