import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { Observable } from 'rxjs';
import { Student } from '../../models/student';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  studentList: Student[] = [];
  displayedColums: string[] = ['ind', 'FIO', 'PhoneNumber'];
  constructor(private dbs: DatabaseService, private as: AuthService) {}

  ngOnInit() {
    const groupNumber = this.as.getGroupNumber();
    this.dbs
      .getStudentListByGroup(groupNumber)
      .then(data => {
        this.studentList = data;
      })
      .catch(err => console.log(err));
  }
}
