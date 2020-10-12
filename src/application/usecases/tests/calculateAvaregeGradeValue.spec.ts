import { calculateAvaregeGradeValue } from '../calculateAvaregeGradeValue';

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
    }];

  test('Deve retornar a media 31', async () => {
    const media = await calculateAvaregeGradeValue.exec(fakeGrade, 'Desafio', '02 - Node');
    expect(media).toBe(31);
  });

  test('Deve retornar 0 se não tiver nenhum registro', async () => {
    const media = await calculateAvaregeGradeValue.exec(fakeGrade, 'type_inexistente', 'subject_inexistente');
    expect(media).toBe(0);
    expect(media).not.toBeNull();
    expect(media).not.toBeUndefined();
    expect(media).not.toBeNaN();
  });
});
