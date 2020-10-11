import { IDeleteGradeRepository, IFindAllGradesRepository, IFindByIdGradeRepository, ISaveGradeRepository, IUpdateGradeRepository } from '../../infra/repositories/interfaces/IGradeRepository';
import { IGrade } from '../interfaces/IGrade';

export class Grade {
 public id: number|null
 public student: string
 public subject: string
 public type: string
 public value: number
 public timestamp: Date
 constructor (student:string, subject:string, type:string, value:number, timestamp:Date, id:number|null) {
   this.id = id;
   this.student = student;
   this.subject = subject;
   this.type = type;
   this.value = value;
   this.timestamp = timestamp;
 }

 static init (student:string, subject:string, type:string, value:number, timestamp:Date, id:number|null) {
   return new Grade(student, subject, type, value, timestamp, id);
 }

 async update (filename: string, grade: IGrade, controller:IUpdateGradeRepository): Promise<IGrade | null> {
   return await controller.updateGradeById(filename, grade);
 }

 async save (filename: string, grade: IGrade, controller:ISaveGradeRepository): Promise<IGrade> {
   return await controller.saveNewGrade(filename, grade);
 }

 async delete (filename: string, id:number, controller:IDeleteGradeRepository): Promise<void> {
   await controller.deleteGradeById(filename, id);
 }

 static async findAll (filename: string, controller:IFindAllGradesRepository):Promise<Array<IGrade>> {
   const register = await controller.findAll(filename);
   return register[0].data;
 }

 static async findById (filename: string, id:number, controller:IFindByIdGradeRepository): Promise<IGrade|null> {
   return await controller.findById(filename, id);
 }
}
