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

  async addTown({ Name, IDTown }: Town) {
    const q = `exec AddTown '${Name}', ${IDTown}`;
    return this.connection.query(q);
  }

  async updateTown(next: Town, old: Town) {
    const q = `update Town set IDTown = ${next.IDTown}, Name = '${next.Name}' where IDTown = ${old.IDTown}`;
    console.log(q);
    return this.connection.query(q);
  }

  async deleteTown({ IDTown }: Town) {
    return this.connection.query(`exec DeleteTown ${IDTown}`);
  }

  async getTownList() {
    return await this.getList('Town');
  }

  async addEmployeeStatus({ Type, Name, IDEmployeeStatus }: EmployeeStatus) {
    const q = `exec AddEmployeeStatus ${Type}, '${Name}', ${IDEmployeeStatus}`;
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
    const q = `exec AddStudent ${IDTown}, ${IDParent1}, ${IDParent2}, '${Citizenship}', '${Surname}', '${Name}', '${Patronymic}', '${Sex}', '${DateOfBirth}', '${PlaceOfResidence}', '${AddresOfResidence}', '${PhoneNumber}', ${IDStudent}`;
    return this.connection.query(q);
  }

  async deleteStudent({ IDStudent }: Student) {
    return this.connection.query(`exec DeleteStudent ${IDStudent}`);
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
    BoolData,
    IDInfo
  }: Info) {
    const boolData = BoolData ? 1 : 0;
    const q = `exec AddInfo ${IDStudent}, ${IDInfoCategory}, ${Course}, ${Semester}, '${TextData}', ${boolData}, ${IDInfo}`;
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
    const q = `exec AddStudyGroup ${IDEmployee}, ${GroupNumber}, ${Specialty}, '${DateOfFormation}', ${IDStudyGroup}`;
    return this.connection.query(q);
  }

  async deleteStudyGroup({ IDStudyGroup }: StudyGroup) {
    return this.connection.query(`exec DeleteStudyGroup ${IDStudyGroup}`);
  }

  async getStudyGroupList() {
    return await this.getList('StudyGroup');
  }

  async addTransfer({ IDStudent, IDStudyGroup, Date, IDTransfer }: Transfer) {
    const q = `exec AddTransfer ${IDStudent}, ${IDStudyGroup}, '${Date}', ${IDTransfer}`;
    return this.connection.query(q);
  }

  async deleteTransfer({ IDTransfer }: Transfer) {
    return this.connection.query(`exec DeleteTransfer ${IDTransfer}`);
  }

  async getTransferList() {
    return await this.getList('Transfer');
  }
}
