
import {
  saveNewGrade, findById, updateGradeById,
  findAll, deleteGradeById
} from '../../infra/repositories/json/grade-repository';
import { deleteFile } from '../../infra/repositories/json/utils/json-repository';
import { Grade } from './Grade';

describe('Grade', () => {
  beforeAll(async () => await deleteFile('grades_test'));
  afterAll(async () => await deleteFile('grades_test'));

  test('Deve salvar um novo registro', async () => {
    const grade = Grade.init('Alessandro', 'NodeApi', 'Teste', 8, new Date(), null);
    const savedData = await grade.save('grades_test', grade, { saveNewGrade });
    if (savedData.id !== null) {
      const gradeCreated = await Grade.findById('grades_test', savedData.id, { findById });
      expect(gradeCreated?.student).toBe('Alessandro');
    }
    expect(savedData.id).not.toBeNull();
  });

  test('Deve atualizar o registro', async () => {
    const grade = Grade.init('Alessandro M', 'Node - Api', 'Prova', 10, new Date(), 1);
    const gradeUpdated = await grade.update('grades_test', grade, { updateGradeById });
    expect(gradeUpdated?.student).toBe('Alessandro M');
    expect(gradeUpdated?.id).toBe(1);
    expect(gradeUpdated?.type).toBe('Prova');
    expect(gradeUpdated?.value).toBe(10);
  });

  test('Deve buscar um registro pelo id', async () => {
    const gradeFound = await Grade.findById('grades_test', 1, { findById });
    expect(gradeFound?.student).toEqual('Alessandro M');
    expect(gradeFound?.id).toEqual(1);
  });

  test('Deve retornar nulo se tentar buscar um registro que não existe', async () => {
    const notExistGrade = await Grade.findById('grades_test', 1000, { findById });
    expect(notExistGrade).toEqual(null);
  });

  test('Deve listar todos os registro', async () => {
    const grades = await Grade.findAll('grades_test', { findAll });
    expect(grades?.length).toBeGreaterThan(0);
  });

  test('Deve excluir um registro', async () => {
    const grade = await Grade.findById('grades_test', 1, { findById });
    expect(grade).not.toBeNull();
    if (grade) {
      const grade = Grade.init('Alessandro M', 'Node - Api', 'Prova', 10, new Date(), 1);
      await grade.delete('grades_test', 1, { deleteGradeById });
      const accDeleted = await Grade.findById('grades_test', 1, { findById });
      expect(accDeleted).toBeNull();
    }
  });
});
