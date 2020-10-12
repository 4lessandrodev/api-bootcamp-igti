import { IGrade } from '../../domain/interfaces/IGrade';

interface IResult{
 quantidadeRegistros: number
 soma:number
 media:number
}

export const checkTotalGradeValueForOneStudent = {
  exec: async (registros: Array<IGrade>, student: string, subject: string): Promise<number> => {
    const result: IResult = { quantidadeRegistros: 0, soma: 0, media: 0 };
    for (const grade of registros) {
      if (grade.student === student && grade.subject === subject) {
        ++result.quantidadeRegistros;
        result.soma += grade.value;
      }
    };

    return result.soma;
  }
};
