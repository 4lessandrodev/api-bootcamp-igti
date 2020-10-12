import {
  calculateAvaregeGradeValue,
  checkTotalGradeValueForOneStudent,
  findBettersAvaregeGradeValue
} from '../../application/usecases';
import { IDeleteGradeRepository, IFindAllGradesRepository, IFindByIdGradeRepository, ISaveGradeRepository, IUpdateGradeRepository } from '../../infra/repositories/interfaces/IGradeRepository';
import { IGrade } from '../interfaces/IGrade';
import { IGradetMethods } from '../interfaces/IGradeMthods';

export class Grade implements IGradetMethods {
 public id: number|null
 public student: string
 public subject: string
 public type: string
 public value: number
 public timestamp: string
 constructor (student:string, subject:string, type:string, value:number, timestamp:string, id:number|null) {
   this.id = id;
   this.student = student;
   this.subject = subject;
   this.type = type;
   this.value = value;
   this.timestamp = timestamp;
 }

 async calculateAvaregeGradeValue (filename: string, type: string, subject: string,
   controller: IFindAllGradesRepository): Promise<number> {
   const grades = await Grade.findAll(filename, controller);
   return await calculateAvaregeGradeValue.exec(grades, type, subject);
 }

 async findBettersAvaregeGradeValue (filename: string, type: string, subject: string, controller: IFindAllGradesRepository): Promise<IGrade[]> {
   const grades = await Grade.findAll(filename, controller);
   return await findBettersAvaregeGradeValue.exec(grades, type, subject);
 }

 async checkTotalGradeValueForOneStudent (filename: string, student: string, subject: string, controller: IFindAllGradesRepository): Promise<number> {
   const grades = await Grade.findAll(filename, controller);
   return await checkTotalGradeValueForOneStudent.exec(grades, student, subject);
 }

 static async checkTotalGradeValueForOneStudent (filename: string, student: string, subject: string, controller: IFindAllGradesRepository): Promise<number> {
   const grade = new Grade('', '', '', 0, '', null);
   return await grade.checkTotalGradeValueForOneStudent(filename, student, subject, controller);
 }

 static async calculateAvaregeGradeValue (filename: string, type: string, subject: string, controller: IFindAllGradesRepository): Promise<number> {
   const grade = new Grade('', '', '', 0, '', null);
   return await grade.calculateAvaregeGradeValue(filename, type, subject, controller);
 }

 static async findBettersAvaregeGradeValue (filename: string, type: string, subject: string, controller: IFindAllGradesRepository): Promise<IGrade[]> {
   const grade = new Grade('', '', '', 0, '', null);
   return await grade.findBettersAvaregeGradeValue(filename, type, subject, controller);
 }

 static init (student:string, subject:string, type:string, value:number, timestamp:string, id:number|null) {
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
