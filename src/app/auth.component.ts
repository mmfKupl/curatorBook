import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './database.service';
import { EmployeeStatus } from './models/employee-status';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { StudyGroup } from './models/study-group';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  groupNumber: string;
  userType: string;
  statusList: EmployeeStatus[] = [];
  groupList: StudyGroup[] = [];

  constructor(
    private dbs: DatabaseService,
    private as: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.as.isLogin()) {
      this.router.navigateByUrl('');
    }
    this.dbs.getEmployeeStatusList().then(data => {
      this.statusList = data;
    });
    this.dbs.getStudyGroupList().then(data => {
      this.groupList = data;
    });
  }

  logIn() {
    this.as
      .logIn({
        group: +this.groupNumber,
        type: +this.userType
      })
      .then(data => {
        if (data) {
          this.router.navigateByUrl('');
        }
      })
      .catch(err => console.log(err));
  }
}
