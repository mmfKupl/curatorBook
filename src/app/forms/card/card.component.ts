import {Component, OnInit} from '@angular/core';
import {Student} from '../../models/student';
import {DatabaseService} from '../../database.service';
import {AuthService} from '../../auth.service';
import {Parent} from '../../models/parent';
import {Info} from '../../models/info';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  students: Student[] = [];
  currentStudentId: number;

  parents: Parent[] = [];
  info: Info[] = [];

  constructor(private dbs: DatabaseService, private as: AuthService) {
  }

  ngOnInit() {
    this.dbs.getStudentList().then(students => {
      this.students = students;
    });
    this.dbs.getParentList().then(parents => {
      this.parents = parents;
    });
    this.dbs.getInfoList().then(info => {
      this.info = info;
    });
  }

  get currentInfo() {
    return this.info.filter(info => info.IDStudent === this.currentStudentId);
  }

  saveToXml() {
    const d = {...this.currentStudent};
    delete d.constructor;
    console.log(this.dbs.parseToXml({currentStudent: d, currentParents: this.currentParents, info: this.currentInfo}, 'StudentCard'));
  }

  get currentStudent() {
    return this.students.find(student => student.IDStudent === this.currentStudentId);
  }

  get currentStudentKeys() {
    return Object.keys(this.currentStudent || {}).filter((key: string) => !key.includes('ID') && !key.includes('DateOfBirth'));
  }

  get currentParents() {
    return this.parents.filter(parent =>
      parent.IDParent === this.currentStudent.IDParent1 ||
      parent.IDParent === this.currentStudent.IDParent2
    );
  }

  getKeyses(object: any, includes: string[] = []) {
    const f = (key: string, text: string) => {
      return key === text;
    };
    if (includes.length) {
      return Object.keys(object).filter(key => !includes.reduce((acc, cur) => {
        return acc || f(key, cur);
      }, false));
    }
    return Object.keys(object).filter(key => !key.includes('ID'));
  }
}
