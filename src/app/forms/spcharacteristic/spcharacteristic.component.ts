import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { DatabaseService } from '../../database.service';
import { AuthService } from '../../auth.service';

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

  constructor(private dbs: DatabaseService, private as: AuthService) {}

  ngOnInit() {
    const groupNumber = this.as.getGroupNumber();
    this.dbs
      .getSPCharacteristic(groupNumber)
      .then(data => {
        console.log(data);
        this.data = this.reduceData(data);
        console.log(this.data);
        console.log(Array.from(this.data));
      })
      .catch(err => console.log(err));
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
    for (let key in d) {
      const stud = d[key];
    }
    return d;
  }
}
