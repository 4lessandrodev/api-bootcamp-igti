import { IGrade } from '../../domain/interfaces/IGrade';

interface IResult{
 quantidadeRegistros: number
 soma:number
 media:number
}

export const calculateAvaregeGradeValue = {
  exec: async (registros: Array<IGrade>, type: string, subject: string): Promise<number> => {
    const result: IResult = { quantidadeRegistros: 0, soma: 0, media: 0 };
    for (const grade of registros) {
      if (grade.type === type && grade.subject === subject) {
        ++result.quantidadeRegistros;
        result.soma += grade.value;
      }
    };
    result.media = (result.quantidadeRegistros === 0 ||
      result.soma === 0) ? 0 : (result.soma / result.quantidadeRegistros);
    return result.media;
  }
};
