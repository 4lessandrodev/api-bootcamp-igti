import { IDeleteGradeRepository, ISaveGradeRepository, IUpdateGradeRepository } from '../../infra/repositories/interfaces/IGradeRepository';
import { IGrade } from './IGrade';

export interface IGradetMethods{
 update(filename: string, element: IGrade, controller: IUpdateGradeRepository): Promise<IGrade | null>
 save(filename: string, element: IGrade, controller:ISaveGradeRepository): Promise<IGrade>
 delete(filename: string, id: number, controller: IDeleteGradeRepository): Promise<void>
}
