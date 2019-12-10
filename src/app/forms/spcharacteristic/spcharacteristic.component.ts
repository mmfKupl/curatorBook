import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { DatabaseService } from '../../database.service';
import { AuthService } from '../../auth.service';
import { TouchBarScrubber } from 'electron';

interface SPCItem {
  IDStudent: number;
  Surname: string;
  Name: string;
  Patronymic: string;
  DateOfBirth: string | Date | Moment;
  Semester: number;
  Course: number;
  BoolData: boolean;
  TextData: string;
  InfoCategoryName: string;
  TypeInfoCategoryName: string;
}

@Component({
  selector: 'app-spcharacteristic',
  templateUrl: './spcharacteristic.component.html',
  styleUrls: ['./spcharacteristic.component.scss']
})
export class SPCharacteristicComponent implements OnInit {
  data: any;
  displayedColums: string[] = ['ind', 'FIO', 'DateOfBirth'];
  currentCourse = 1;
  currentSemester = 1;
  activeData: any[] = [];
  currentInfoCategories: string[] = [];

  constructor(private dbs: DatabaseService, private as: AuthService) {}

  ngOnInit() {
    const groupNumber = this.as.getGroupNumber();
    Promise.all([
      this.dbs.getInfoCategoryList(),
      this.dbs.getTypeInfoCategoryList()
    ]).then(data => {
      const spc = data[1].find(d => d.Name === 'СПХ');
      if (!spc) {
        return;
      }
      this.currentInfoCategories = data[0]
        .filter(d => d.IDTypeInfoCategory === spc.IDTypeInfoCategory)
        .map(d => d.Name);
      this.displayedColums = [
        'ind',
        'FIO',
        'DateOfBirth',
        ...this.currentInfoCategories
      ];
      console.log(this.displayedColums);
    });
    this.dbs
      .getSP('СПХ', groupNumber)
      .then(data => {
        this.data = this.reduceData(data);
        console.log(this.data);
      })
      .catch(err => console.log(err));
  }

  setCourseAndSemester(course: number, semester: number) {
    console.log(course, semester);
    this.currentCourse = course;
    this.currentSemester = semester;
  }

  reduceData(data: SPCItem[]) {
    const d = data.reduce((acc, cur) => {
      if (!acc[cur.IDStudent]) {
        acc[cur.IDStudent] = {
          Surname: cur.Surname,
          Name: cur.Name,
          Patronymic: cur.Patronymic,
          DateOfBirth: cur.DateOfBirth
        };
        acc[cur.IDStudent].courses = {};
      }
      const curStud = acc[cur.IDStudent];
      if (!curStud.courses[cur.Course]) {
        curStud.courses[cur.Course] = { semesters: {} };
      }
      if (!curStud.courses[cur.Course].semesters[cur.Semester]) {
        curStud.courses[cur.Course].semesters[cur.Semester] = [];
      }

      curStud.courses[cur.Course].semesters[cur.Semester].push({
        BoolData: cur.BoolData,
        TextData: cur.TextData,
        InfoCategoryName: cur.InfoCategoryName,
        TypeInfoCategoryName: cur.TypeInfoCategoryName
      });

      return acc;
    }, {});
    const arr = [];
    // tslint:disable-next-line: forin
    for (const key in d) {
      const stud = d[key];
      stud.IDStudent = key;
      arr.push(stud);
    }
    return arr;
  }

  getStudentData(i: number, value: string) {
    const d = this.data[i].courses[this.currentCourse].semesters[
      this.currentSemester
    ];
    if (!d) {
      return {};
    }
    return d.find(
      (dd: { InfoCategoryName: string }) => dd.InfoCategoryName === value
    );
  }
  saveToXml() {
    console.log(this.dbs.parseToXml(this.data, 'Characteristics'));
  }
}
