import { IGrade } from '../../../domain/interfaces/IGrade';
import { IDefaultGradetData } from '../json/utils/IDefaultGrade';

export interface IDeleteGradeRepository{
deleteGradeById (filename: string, id: number): Promise<boolean>
}

export interface IUpdateGradeRepository {
 updateGradeById(filename: string, Grade: IGrade): Promise<IGrade | null>
}

export interface ISaveGradeRepository{
 saveNewGrade(filename: string, data: IGrade): Promise<IGrade>
}

export interface IFindAllGradesRepository {
findAll(filename:string):Promise<Array<IDefaultGradetData>>
}

export interface IFindByIdGradeRepository{
 findById(filename:string, _id:number): Promise<IGrade|null>
}
