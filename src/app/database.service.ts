import { Injectable } from '@angular/core';
import { DatabaseInterface } from '../../db/db';
import { ConnectionPool } from 'mssql';
import { Town } from './models/town';
import { EmployeeStatus } from './models/employee-status';
import { TypeInfoCategory } from './models/type-info-category';
import { InfoCategory } from './models/info-category';
import { Employee } from './models/employee';
import { Parent } from './models/parent';
import { Student } from './models/student';
import { Info } from './models/info';
import { StudyGroup } from './models/study-group';
import { Transfer } from './models/transfer';
import { isMoment, isDate, Moment } from 'moment';
import * as moment from 'moment/moment';
import { OptionValue } from './models/option-value';
import { AuthService } from './auth.service';
const { remote } = require('electron');

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  connection: ConnectionPool;

  private listData: {
    Town?: string;
    EmployeeStatus?: string;
    TypeInfoCategory?: string;
    InfoCategory?: string;
    Employee?: string;
    Parent?: string;
    Student?: string;
    Info?: string;
    StudyGroup?: string;
    Transfer?: string;
  } = {};

  constructor() {
    this.connection = (remote.getGlobal(
      'database'
    ) as DatabaseInterface).connection;
  }

  getOptionData(tableName: string, listItem: any): OptionValue {
    switch (tableName) {
      case 'Town':
        return new OptionValue(listItem.IDTown, listItem.Name);
      case 'Parent':
        return new OptionValue(
          listItem.IDParent,
          `${listItem.Surname} ${listItem.Name} ${listItem.Patronymic}`
        );
      case 'EmployeeStatus':
        return new OptionValue(listItem.IDEmployeeStatus, listItem.Name);
      case 'Employee':
        return new OptionValue(
          listItem.IDEmployee,
          `${listItem.Name} ${listItem.Surname}`
        );
      case 'StudyGroup':
        return new OptionValue(
          listItem.IDStudyGroup,
          `${listItem.GroupNumber} | ${listItem.Specialty}`
        );
      case 'Student':
        return new OptionValue(
          listItem.IDStudent,
          `${listItem.Surname} ${listItem.Name} ${listItem.Patronymic}`
        );
      case 'TypeInfoCategory':
        return new OptionValue(listItem.IDTypeInfoCategory, listItem.Name);
      case 'InfoCategory':
        return new OptionValue(listItem.IDInfoCategory, listItem.Name);
      default:
        const keys = Object.keys(listItem);
        return new OptionValue(listItem[keys[0]], listItem[keys[1]]);
    }
  }

  async getList(name: string, needUpdate: boolean) {
    if (
      needUpdate ||
      !this.listData[name] ||
      this.listData[name].length !== (await this.getListLength(name))
    ) {
      this.listData[name] = (
        await this.connection.query(`exec Get${name}List`)
      ).recordset;
    }
    return this.listData[name];
  }

  async getItemByIDFromTable(tableName: string, id: number) {
    return (
      await this.connection.query(
        `select * from ${tableName} where ID${tableName} = ${id}`
      )
    ).recordset[0];
  }

  private async getListLength(name: string) {
    return (
      await this.connection.query(`select count(*) as amount from ${name}`)
    ).recordset[0].amount;
  }

  async addTown({ Name, IDTown }: Town) {
    const q = `exec AddTown '${Name}', ${IDTown}`;
    return this.connection.query(q);
  }

  async updateTown(next: Town, old: Town) {
    const q = `exec updateTown '${next.Name}', ${old.IDTown}`;
    return this.connection.query(q);
  }

  async deleteTown({ IDTown }: Town) {
    return this.connection.query(`exec DeleteTown ${IDTown}`);
  }

  async getTownList(needUpdate: boolean) {
    return await this.getList('Town', needUpdate);
  }

  async addEmployeeStatus({ Name, IDEmployeeStatus }: EmployeeStatus) {
    const q = `exec AddEmployeeStatus '${Name}', ${IDEmployeeStatus}`;
    return this.connection.query(q);
  }

  async updateEmployeeStatus(next: EmployeeStatus, old: EmployeeStatus) {
    const q = `exec updateEmployeeStatus '${next.Name}', ${old.IDEmployeeStatus}`;
    return this.connection.query(q);
  }

  async deleteEmployeeStatus({ IDEmployeeStatus }: EmployeeStatus) {
    return this.connection.query(
      `exec DeleteEmployeeStatus ${IDEmployeeStatus}`
    );
  }

  async getEmployeeStatusList(
    needUpdate: boolean = false
  ): Promise<EmployeeStatus[]> {
    return await this.getList('EmployeeStatus', needUpdate);
  }

  async addTypeInfoCategory({ Name, IDTypeInfoCategory }: TypeInfoCategory) {
    const q = `exec AddTypeInfoCategory '${Name}', ${IDTypeInfoCategory}`;
    console.log(q);
    return this.connection.query(q);
  }

  async updateTypeInfoCategory(next: TypeInfoCategory, old: TypeInfoCategory) {
    const q = `exec updateTypeInfoCategory '${next.Name}', ${old.IDTypeInfoCategory}`;
    return this.connection.query(q);
  }

  async deleteTypeInfoCategory({ IDTypeInfoCategory }: TypeInfoCategory) {
    return this.connection.query(
      `exec DeleteTypeInfoCategory ${IDTypeInfoCategory}`
    );
  }

  async getTypeInfoCategoryList(
    needUpdate: boolean = false
  ): Promise<TypeInfoCategory[]> {
    return await this.getList('TypeInfoCategory', needUpdate);
  }

  async addInfoCategory({
    IDTypeInfoCategory,
    Name,
    IDInfoCategory
  }: InfoCategory) {
    const q = `exec AddInfoCategory ${IDTypeInfoCategory}, '${Name}', ${IDInfoCategory}`;
    return this.connection.query(q);
  }

  async updateInfoCategory(next: InfoCategory, old: InfoCategory) {
    const q = `exec updateInfoCategory ${next.IDTypeInfoCategory}, '${next.Name}', ${old.IDInfoCategory}`;
    return this.connection.query(q);
  }

  async deleteInfoCategory({ IDInfoCategory }: InfoCategory) {
    return this.connection.query(`exec DeleteInfoCategory ${IDInfoCategory}`);
  }

  async getInfoCategoryList(
    needUpdate: boolean = false
  ): Promise<InfoCategory[]> {
    return await this.getList('InfoCategory', needUpdate);
  }

  async addEmployee({
    IDEmployeeStatus,
    Surname,
    Name,
    Patronymic,
    PhoneNumber,
    IDEmployee
  }: Employee) {
    const q = `exec AddEmployee ${IDEmployeeStatus}, '${Surname}', '${Name}', '${Patronymic}', '${PhoneNumber}', ${IDEmployee}`;
    return this.connection.query(q);
  }

  async updateEmployee(
    { IDEmployeeStatus, Surname, Name, Patronymic, PhoneNumber }: Employee,
    { IDEmployee }: Employee
  ) {
    const q = `exec updateEmployee  ${IDEmployeeStatus}, '${Surname}', '${Name}', '${Patronymic}', '${PhoneNumber}', ${IDEmployee}`;
    return this.connection.query(q);
  }

  async deleteEmployee({ IDEmployee }: Employee) {
    return this.connection.query(`exec DeleteEmployee ${IDEmployee}`);
  }

  async getEmployeeList(needUpdate: boolean = false): Promise<Employee[]> {
    return await this.getList('Employee', needUpdate);
  }

  async addParent({
    Citizenship,
    Surname,
    Name,
    Patronymic,
    Sex,
    WorkPlace,
    WorkPosition,
    PhoneNumber1,
    PhoneNumber2,
    IDParent
  }: Parent) {
    const q = `exec AddParent '${Citizenship}', '${Surname}', '${Name}', '${Patronymic}', '${Sex}', '${WorkPlace}', '${WorkPosition}', '${PhoneNumber1}', '${PhoneNumber2}', ${IDParent}`;
    return this.connection.query(q);
  }

  async updateParent(
    {
      Citizenship,
      Surname,
      Name,
      Patronymic,
      Sex,
      WorkPlace,
      WorkPosition,
      PhoneNumber1,
      PhoneNumber2
    }: Parent,
    { IDParent }: Parent
  ) {
    const q = `exec updateParent  '${Citizenship}', '${Surname}', '${Name}', '${Patronymic}', '${Sex}', '${WorkPlace}', '${WorkPosition}', '${PhoneNumber1}', '${PhoneNumber2}', ${IDParent}`;
    return this.connection.query(q);
  }

  async deleteParent({ IDParent }: Parent) {
    return this.connection.query(`exec DeleteParent ${IDParent}`);
  }

  async getParentList(needUpdate: boolean) {
    return await this.getList('Parent', needUpdate);
  }

  async addStudent({
    IDTown,
    IDParent1,
    IDParent2,
    Citizenship,
    Surname,
    Name,
    Patronymic,
    Sex,
    DateOfBirth,
    PlaceOfResidence,
    AddresOfResidence,
    PhoneNumber,
    IDStudent
  }: Student) {
    const date = this.convertDate(DateOfBirth);
    const q = `exec AddStudent ${IDTown}, ${IDParent1}, ${IDParent2}, '${Citizenship}', '${Surname}', '${Name}', '${Patronymic}', '${Sex}', '${date}', '${PlaceOfResidence}', '${AddresOfResidence}', '${PhoneNumber}', ${IDStudent}`;
    return this.connection.query(q);
  }

  async updateStudent(
    {
      IDTown,
      IDParent1,
      IDParent2,
      Citizenship,
      Surname,
      Name,
      Patronymic,
      Sex,
      DateOfBirth,
      PlaceOfResidence,
      AddresOfResidence,
      PhoneNumber
    }: Student,
    { IDStudent }: Student
  ) {
    const date = this.convertDate(DateOfBirth);
    const q = `exec updateStudent  ${IDTown}, ${IDParent1}, ${IDParent2}, '${Citizenship}', '${Surname}', '${Name}', '${Patronymic}', '${Sex}', '${date}', '${PlaceOfResidence}', '${AddresOfResidence}', '${PhoneNumber}', ${IDStudent}`;
    return this.connection.query(q);
  }

  async deleteStudent({ IDStudent }: Student) {
    return this.connection.query(`exec DeleteStudent ${IDStudent}`);
  }

  async getStudentList(needUpdate: boolean = false): Promise<Student[]> {
    const data: Student[] = (
      await this.getList('Student', needUpdate)
    ).map(item => Student.getFromFormGroup(item));
    return data;
  }

  async getStudentListByGroup(groupNumber: number): Promise<Student[]> {
    if (groupNumber === -1) {
      return await this.getStudentList();
    }
    const q = `exec GetStudentListByGroup '${groupNumber}'`;
    return (await this.connection.query(q)).recordset;
  }

  async addInfo({
    IDStudent,
    IDInfoCategory,
    Course,
    Semester,
    TextData,
    BoolData,
    IDInfo
  }: Info) {
    const boolData = BoolData ? 1 : 0;
    const q = `exec AddInfo ${IDStudent}, ${IDInfoCategory}, ${Course}, ${Semester}, '${TextData}', ${boolData}, ${IDInfo}`;
    return this.connection.query(q);
  }

  async updateInfo(
    { IDStudent, IDInfoCategory, Course, Semester, TextData, BoolData }: Info,
    { IDInfo }: Info
  ) {
    const boolData = BoolData ? 1 : 0;
    const q = `exec updateInfo  ${IDStudent}, ${IDInfoCategory}, ${Course}, ${Semester}, '${TextData}', ${boolData}, ${IDInfo}`;
    return this.connection.query(q);
  }

  async deleteInfo({ IDInfo }: Info) {
    return this.connection.query(`exec DeleteInfo ${IDInfo}`);
  }

  async getInfoList(needUpdate: boolean) {
    return await this.getList('Info', needUpdate);
  }

  async addStudyGroup({
    IDEmployee,
    GroupNumber,
    Specialty,
    DateOfFormation,
    IDStudyGroup
  }: StudyGroup) {
    const date = this.convertDate(DateOfFormation);
    const q = `exec AddStudyGroup ${IDEmployee}, ${GroupNumber}, ${Specialty}, '${date}', ${IDStudyGroup}`;
    return this.connection.query(q);
  }

  async updateStudyGroup(
    {
      IDEmployee,
      IDHeadman,
      IDDeputyHeadman,
      GroupNumber,
      Specialty,
      DateOfFormation
    }: StudyGroup,
    { IDStudyGroup }: StudyGroup
  ) {
    const date = this.convertDate(DateOfFormation);
    const q = `exec updateStudyGroup  ${IDEmployee}, ${IDHeadman}, ${IDDeputyHeadman}, ${GroupNumber}, ${Specialty}, '${date}', ${IDStudyGroup}`;
    return this.connection.query(q);
  }

  async deleteStudyGroup({ IDStudyGroup }: StudyGroup) {
    return this.connection.query(`exec DeleteStudyGroup ${IDStudyGroup}`);
  }

  async getStudyGroupList(needUpdate: boolean = false): Promise<StudyGroup[]> {
    return (await this.getList('StudyGroup', needUpdate)).map(item =>
      StudyGroup.getFromFormGroup(item)
    );
  }

  async addTransfer({
    IDStudent,
    IDStudyGroup,
    Date: _Date,
    IDTransfer
  }: Transfer) {
    const date = this.convertDate(_Date);
    const q = `exec AddTransfer ${IDStudent}, ${IDStudyGroup}, '${date}', ${IDTransfer}`;
    console.log(q);
    return this.connection.query(q);
  }

  async updateTransfer(
    { IDStudent, IDStudyGroup, Date: _Date }: Transfer,
    { IDTransfer }: Transfer
  ) {
    let date: string | Date = _Date;
    if (isMoment(date)) {
      date = date.format('L');
    }
    const q = `exec updateTransfer  ${IDStudent}, ${IDStudyGroup}, '${date}', ${IDTransfer}`;
    return this.connection.query(q);
  }

  async deleteTransfer({ IDTransfer }: Transfer) {
    return this.connection.query(`exec DeleteTransfer ${IDTransfer}`);
  }

  async getTransferList(needUpdate: boolean = false): Promise<Transfer[]> {
    return await this.getList('Transfer', needUpdate);
  }

  private convertDate(date: string | Date | Moment) {
    if (isMoment(date)) {
      return date.format('MM.DD.YYYY');
    } else if (isDate(date)) {
      date = moment(date);
      return date.format('MM.DD.YYYY');
    }
    return date;
  }

  async getSPCharacteristic(groupNumber: number) {
    return (
      await this.connection.query(`exec GetSPCharacteristic ${groupNumber}`)
    ).recordset;
  }
}
