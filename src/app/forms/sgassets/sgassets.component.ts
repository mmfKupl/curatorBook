import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { AuthService } from '../../auth.service';
import { StudyGroup } from '../../models/study-group';

@Component({
  selector: 'app-sgassets',
  templateUrl: './sgassets.component.html',
  styleUrls: ['./sgassets.component.scss']
})
export class SGAssetsComponent implements OnInit {
  data: any;
  currentGroup: StudyGroup;
  headman: string;
  deputyHeadman: string;
  currentCourse = 1;
  currentSemester = 1;
  constructor(private dbs: DatabaseService, private as: AuthService) {}

  ngOnInit() {
    const groupNumber = this.as.getGroupNumber();
    this.dbs.getStudyGroupList().then(data => {
      console.log(data);
      if (groupNumber === -1) {
        this.currentGroup = data[0] || null;
      } else {
        this.currentGroup = data.find(d => d.IDStudyGroup === groupNumber);
      }
      Promise.all([
        this.dbs.getHeadman(groupNumber),
        this.dbs.getDeputyHeadmen(groupNumber)
      ]).then((d: any[]) => {
        if (d[0][0]) {
          this.headman =
            d[0][0].Surname + ' ' + d[0][0].Name + ' ' + d[0][0].Patronymic;
        }
        if (d[1][0]) {
          this.deputyHeadman =
            d[1][0].Surname + ' ' + d[1][0].Name + ' ' + d[1][0].Patronymic;
        }
        this.dbs
          .getSP('АУГ', groupNumber)
          .then(dd => {
            this.data = this.reduceData(dd);
            console.log(this.data);
          })
          .catch(err => console.log(err));
      });
    });
  }

  setCourseAndSemester(course: number, semester: number) {
    console.log(course, semester);
    this.currentCourse = course;
    this.currentSemester = semester;
  }

  reduceData(data) {
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

  getSectors() {
    const sectors = {};
    if (!this.data) {
      return;
    }
    this.data.forEach((item: any, i) => {
      const curCourse = item.courses[this.currentCourse];
      if (!curCourse) {
        return;
      }
      let semester = curCourse.semesters[this.currentSemester];
      if (!semester) {
        return;
      }
      semester = semester[0];
      if (!sectors[semester.InfoCategoryName]) {
        sectors[semester.InfoCategoryName] = [];
      }

      sectors[semester.InfoCategoryName].push({
        FIO: item.Surname + ' ' + item.Name + ' ' + item.Patronymic,
        text: semester.TextData
      });
    });
    const arr = [];
    // tslint:disable-next-line: forin
    for (const sector in sectors) {
      const d = {
        sectorName: sector,
        data: sectors[sector]
      };
      arr.push(d);
    }
    console.log(arr);
    return arr.length ? arr : [];
  }
}
