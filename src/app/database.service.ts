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
    return this.connection.query(`exec Get${name}List`);
  }

  async addTown(town: Town) {
    return this.connection.query(`exec AddTown ${town.Name}`);
  }

  async getTownList() {
    return this.getList('Town');
  }

  async addEmployeeStatus(es: EmployeeStatus) {
    return this.connection.query(`exec AddEmployeeStatus ${es.Type}`);
  }

  async getEmployeeStatusList() {
    return this.getList('EmployeeStatus');
  }

  async addTypeInfoCategory(tic: TypeInfoCategory) {
    return this.connection.query(`exec AddTypeInfoCategory ${tic.Name}`);
  }

  async getTypeInfoCategoryList() {
    return this.getList('TypeInfoCategory');
  }

  async addInfoCategory(ic: InfoCategory) {
    return this.connection.query(
      `exec AddInfoCategory ${ic.IDTypeInfoCategory} ${ic.Name}`
    );
  }

  async getInfoCategoryList() {
    return this.getList('InfoCategory');
  }

  async addEmployee(e: Employee) {
    return this.connection.query(
      `exec AddEmployee ${e.IDEmployeeStatus} ${e.Surname} ${e.Name} ${e.Patronymic} ${e.PhoneNumber}`
    );
  }

  async getEmployeeList() {
    return this.getList('Employee');
  }

  async addParent(p: Parent) {
    return this.connection.query(
      `exec AddParent ${p.Citizenship} ${p.Surname} ${p.Name} ${p.Patronymic} ${p.Sex} ${p.WorkPlace} ${p.WorkPosition} ${p.PhoneNumber1} ${p.PhoneNumber2}`
    );
  }

  async getParentList() {
    return this.getList('Parent');
  }

  async addStudent(s: Student) {
    return this.connection.query(
      `exec AddStudent ${s.IDTown} ${s.IDParent1} ${s.IDParent2} ${s.Citizenship} ${s.Surname} ${s.Name} ${s.Patronymic} ${s.Sex} ${s.DateOfBirth} ${s.PlaceOfResidence} ${s.AddresOfResidence} ${s.PhoneNumber}`
    );
  }

  async getStudentList() {
    return this.getList('Student');
  }

  async addInfo(i: Info) {
    return this.connection.query(
      `exec AddInfo ${i.IDStudent} ${i.IDInfoCategory} ${i.Course} ${i.Semester} ${i.TextData} ${i.BoolData}`
    );
  }

  async getInfoList() {
    return this.getList('Info');
  }

  async addStudyGroup(sg: StudyGroup) {
    return this.connection.query(
      `exec AddStudyGroup ${sg.IDEmployee} ${sg.GroupNumber} ${sg.Specialty} ${sg.DateOfFormation}`
    );
  }

  async getStudyGroupList() {
    return this.getList('StudyGroup');
  }

  async addTransfer(t: Transfer) {
    return this.connection.query(
      `exec AddTransfer ${t.IDStudent} ${t.IDStudyGroup} ${t.Date}`
    );
  }

  async getTransferList() {
    return this.getList('Transfer');
  }
}
