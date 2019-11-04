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

  private async getList(name: string) {
    return (await this.connection.query(`exec Get${name}List`)).recordset;
  }

  async addTown({ Name }: Town) {
    return this.connection.query(`exec AddTown ${Name}`);
  }

  async getTownList() {
    return await this.getList('Town');
  }

  async addEmployeeStatus({ Type, Name }: EmployeeStatus) {
    return this.connection.query(`exec AddEmployeeStatus ${Type} ${Name}`);
  }

  async getEmployeeStatusList() {
    return await this.getList('EmployeeStatus');
  }

  async addTypeInfoCategory({ Name }: TypeInfoCategory) {
    return this.connection.query(`exec AddTypeInfoCategory ${Name}`);
  }

  async getTypeInfoCategoryList() {
    return await this.getList('TypeInfoCategory');
  }

  async addInfoCategory({ IDTypeInfoCategory, Name }: InfoCategory) {
    return this.connection.query(
      `exec AddInfoCategory ${IDTypeInfoCategory} ${Name}`
    );
  }

  async getInfoCategoryList() {
    return await this.getList('InfoCategory');
  }

  async addEmployee({
    IDEmployeeStatus,
    Surname,
    Name,
    Patronymic,
    PhoneNumber
  }: Employee) {
    return this.connection.query(
      `exec AddEmployee ${IDEmployeeStatus} ${Surname} ${Name} ${Patronymic} ${PhoneNumber}`
    );
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
    PhoneNumber2
  }: Parent) {
    return this.connection.query(
      `exec AddParent ${Citizenship} ${Surname} ${Name} ${Patronymic} ${Sex} ${WorkPlace} ${WorkPosition} ${PhoneNumber1} ${PhoneNumber2}`
    );
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
    PhoneNumber
  }: Student) {
    return this.connection.query(
      `exec AddStudent ${IDTown} ${IDParent1} ${IDParent2} ${Citizenship} ${Surname} ${Name} ${Patronymic} ${Sex} ${DateOfBirth} ${PlaceOfResidence} ${AddresOfResidence} ${PhoneNumber}`
    );
  }

  async getStudentList() {
    return await this.getList('Student');
  }

  async addInfo({
    IDStudent,
    IDInfoCategory,
    Course,
    Semester,
    TextData,
    BoolData
  }: Info) {
    return this.connection.query(
      `exec AddInfo ${IDStudent} ${IDInfoCategory} ${Course} ${Semester} ${TextData} ${BoolData}`
    );
  }

  async getInfoList() {
    return await this.getList('Info');
  }

  async addStudyGroup({
    IDEmployee,
    GroupNumber,
    Specialty,
    DateOfFormation
  }: StudyGroup) {
    return this.connection.query(
      `exec AddStudyGroup ${IDEmployee} ${GroupNumber} ${Specialty} ${DateOfFormation}`
    );
  }

  async getStudyGroupList() {
    return await this.getList('StudyGroup');
  }

  async addTransfer({ IDStudent, IDStudyGroup, Date }: Transfer) {
    return this.connection.query(
      `exec AddTransfer ${IDStudent} ${IDStudyGroup} ${Date}`
    );
  }

  async getTransferList() {
    return await this.getList('Transfer');
  }
}
