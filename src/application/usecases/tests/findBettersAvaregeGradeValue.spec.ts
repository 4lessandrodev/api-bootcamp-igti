import { findBettersAvaregeGradeValue } from '../findBettersAvaregeGradeValue';

describe('Calcular media de uma grade', () => {
  const fakeGrade = [
    {
      id: 42,
      student: 'Rodrigo Branas',
      subject: '02 - Node',
      type: 'Desafio',
      value: 18,
      timestamp: '2020-05-19T18:21:25.247Z'
    },
    {
      id: 42,
      student: 'Rodrigo Branas',
      subject: '02 - Node',
      type: 'Trabalho Prático',
      value: 18,
      timestamp: '2020-05-19T18:21:25.247Z'
    },
    {
      id: 50,
      student: 'Lucas Lima',
      subject: '02 - Node',
      type: 'Desafio',
      value: 18,
      timestamp: '2020-05-19T18:21:25.247Z'
    },
    {
      id: 53,
      student: 'Lucas Lima',
      subject: '02 - Node',
      type: 'Desafio',
      value: 10,
      timestamp: '2020-05-19T18:21:25.247Z'
    },
    {
      id: 43,
      student: 'Rodrigo Branas',
      subject: '03 - React',
      type: 'Trabalho Prático',
      value: 6,
      timestamp: '2020-05-19T18:21:25.253Z'
    },
    {
      id: 44,
      student: 'Rodrigo Branas',
      subject: '04 - MongoDB',
      type: 'Trabalho Prático',
      value: 28,
      timestamp: '2020-05-19T18:21:25.260Z'
    },
    {
      id: 45,
      student: 'Rodrigo Branas',
      subject: '01 - JavaScript',
      type: 'Desafio',
      value: 16,
      timestamp: '2020-05-19T18:21:25.266Z'
    },
    {
      id: 46,
      student: 'Rodrigo Branas',
      subject: '02 - Node',
      type: 'Desafio',
      value: 44,
      timestamp: '2020-05-19T18:21:25.272Z'
    },
    {
      id: 47,
      student: 'Rodrigo Branas',
      subject: '03 - React',
      type: 'Desafio',
      value: 36,
      timestamp: '2020-05-19T18:21:25.278Z'
    }, {
      id: 48,
      student: 'Rodrigo Branas',
      subject: '04 - MongoDB',
      type: 'Desafio',
      value: 45,
      timestamp: '2020-05-19T18:21:25.284Z'
    },
    {
      id: 54,
      student: 'Lucas Lima',
      subject: '02 - Node',
      type: 'Desafio',
      value: 2,
      timestamp: '2020-05-19T18:21:25.247Z'
    }];

  test('Deve retornar o total 31', async () => {
    const grades = await findBettersAvaregeGradeValue.exec(fakeGrade, 'Desafio', '02 - Node');
    expect(grades).toEqual([{
      id: 46,
      student: 'Rodrigo Branas',
      subject: '02 - Node',
      type: 'Desafio',
      value: 44,
      timestamp: '2020-05-19T18:21:25.272Z'
    },
    {
      id: 42,
      student: 'Rodrigo Branas',
      subject: '02 - Node',
      type: 'Desafio',
      value: 18,
      timestamp: '2020-05-19T18:21:25.247Z'
    },
    {
      id: 50,
      student: 'Lucas Lima',
      subject: '02 - Node',
      type: 'Desafio',
      value: 18,
      timestamp: '2020-05-19T18:21:25.247Z'
    }
    ]);
  });

  test('Deve retornar um array vazio se não tiver nenhum registro', async () => {
    const grades = await findBettersAvaregeGradeValue.exec(fakeGrade, 'type_inexistente', 'subject_inexistente');
    expect(grades).toEqual([]);
    expect(grades).not.toBeNull();
    expect(grades).not.toBeUndefined();
    expect(grades).not.toBeNaN();
  });
});
