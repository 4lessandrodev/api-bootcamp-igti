import { IDeleteGradeRepository, IFindAllGradesRepository, ISaveGradeRepository, IUpdateGradeRepository } from '../../infra/repositories/interfaces/IGradeRepository';
import { IGrade } from './IGrade';

export interface IGradetMethods{
 update(filename: string, element: IGrade, controller: IUpdateGradeRepository): Promise<IGrade | null>
 save(filename: string, element: IGrade, controller:ISaveGradeRepository): Promise<IGrade>
 delete(filename: string, id: number, controller: IDeleteGradeRepository): Promise<void>
 checkTotalGradeValueForOneStudent(filename:string, student:string, subject:string, controller: IFindAllGradesRepository):Promise<number>
 calculateAvaregeGradeValue(filename:string, type:string, subject:string, controller: IFindAllGradesRepository):Promise<number>
 findBettersAvaregeGradeValue(filename:string, type:string, subject:string, controller:IFindAllGradesRepository):Promise<Array<IGrade>>
}
