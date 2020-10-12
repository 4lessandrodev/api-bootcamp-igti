import { IGrade } from '../../domain/interfaces/IGrade';

export const findBettersAvaregeGradeValue = {
  exec: async (registros: Array<IGrade>, type: string, subject: string): Promise<Array<IGrade>> => {
    const reigstrosFiltrados:IGrade[] = [];

    registros.map((grade) => {
      if (grade.type === type && grade.subject === subject) {
        reigstrosFiltrados.push(grade);
      }
    });

    return reigstrosFiltrados.sort((a, b) => b.value - a.value).slice(0, 3);
  }
};
