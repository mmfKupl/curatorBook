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
const { remote } = require('electron');

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  connection: ConnectionPool;

  constructor() {
    this.connection = (remote.getGlobal(
      'database'
    ) as DatabaseInterface).connection;
  }

  async getList(name: string) {
    return (await this.connection.query(`exec Get${name}List`)).recordset;
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

  async getTownList() {
    return await this.getList('Town');
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

  async getEmployeeStatusList() {
    return await this.getList('EmployeeStatus');
  }

  async addTypeInfoCategory({ Name, IDTypeInfoCategory }: TypeInfoCategory) {
    const q = `exec AddTypeInfoCategory '${Name}', ${IDTypeInfoCategory}`;
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

  async getTypeInfoCategoryList() {
    return await this.getList('TypeInfoCategory');
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

  async getInfoCategoryList() {
    return await this.getList('InfoCategory');
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

  async getEmployeeList() {
    return await this.getList('Employee');
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

  async getParentList() {
    return await this.getList('Parent');
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

  async getStudentList() {
    const data = await this.getList('Student');
    return data.map(item => Student.getFromFormGroup(item));
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

  async getInfoList() {
    return await this.getList('Info');
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
    { IDEmployee, GroupNumber, Specialty, DateOfFormation }: StudyGroup,
    { IDStudyGroup }: StudyGroup
  ) {
    const date = this.convertDate(DateOfFormation);
    const q = `exec updateStudyGroup  ${IDEmployee}, ${GroupNumber}, ${Specialty}, '${date}', ${IDStudyGroup}`;
    return this.connection.query(q);
  }

  async deleteStudyGroup({ IDStudyGroup }: StudyGroup) {
    return this.connection.query(`exec DeleteStudyGroup ${IDStudyGroup}`);
  }

  async getStudyGroupList() {
    return (await this.getList('StudyGroup')).map(item =>
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

  async getTransferList() {
    return await this.getList('Transfer');
  }

  private convertDate(date: string | Date | Moment) {
    if (isMoment(date)) {
      return date.format('L');
    } else if (isDate(date)) {
      date = moment(date);
      return date.format('L');
    }
    return date;
  }
}
