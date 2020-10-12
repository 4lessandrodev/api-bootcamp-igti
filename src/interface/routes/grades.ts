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

router.get('/media-grade/:type/:subject',
  validation.validateTypeAndSubject(), gradeController.calculateAvaregeGradeValue);

router.get('/melhores-grades/:type/:subject',
  validation.validateTypeAndSubject(), gradeController.findBettersAvaregeGradeValue);

router.get('/nota-total-aluno/:student/:subject', validation.validateSubjectAndStudent(), gradeController.checkTotalGradeValueForOneStudent);

export default router;
