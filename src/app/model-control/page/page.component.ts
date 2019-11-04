import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from '../../models/student';
import { FormGroup } from '@angular/forms';
import { StudyGroup } from '../../models/study-group';
import { Employee } from '../../models/employee';
import { EmployeeStatus } from '../../models/employee-status';
import { InfoCategory } from '../../models/info-category';
import { Info } from '../../models/info';
import { Parent } from '../../models/parent';
import { Town } from '../../models/town';
import { Transfer } from '../../models/transfer';
import { TypeInfoCategory } from '../../models/type-info-category';
import { DatabaseService } from '../../database.service';
import { BaseModel } from '../../models/base-model';
import { MatTableDataSource } from '@angular/material';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  getListFunction: any;
  addFunction: any;

  currentData: BaseModel[] = [];

  currentFormGroup: FormGroup;

  urlSubscription: Subscription;
  selection = new SelectionModel<BaseModel>(true, []);

  constructor(private route: ActivatedRoute, private db: DatabaseService) {}

  ngOnInit() {
    this.urlSubscription = this.route.url.subscribe(async url => {
      const [current] = url;
      const currentPath = current ? current.path : '';
      switch (currentPath) {
        case 'student':
          this.currentFormGroup = Student.getFormGroup();
          this.getListFunction = this.db.getStudentList;
          this.addFunction = this.db.addStudent;
          break;
        case 'study-group':
          this.currentFormGroup = StudyGroup.getFormGroup();
          this.getListFunction = this.db.getStudyGroupList;
          this.addFunction = this.db.addStudyGroup;
          break;
        case 'employee':
          this.currentFormGroup = Employee.getFormGroup();
          this.getListFunction = this.db.getEmployeeList;
          this.addFunction = this.db.addEmployee;
          break;
        case 'employee-status':
          this.currentFormGroup = EmployeeStatus.getFormGroup();
          this.getListFunction = this.db.getEmployeeStatusList;
          this.addFunction = this.db.addEmployeeStatus;
          break;
        case 'info-category':
          this.currentFormGroup = InfoCategory.getFormGroup();
          this.getListFunction = this.db.getInfoCategoryList;
          this.addFunction = this.db.addInfoCategory;
          break;
        case 'info':
          this.currentFormGroup = Info.getFormGroup();
          this.getListFunction = this.db.getInfoList;
          this.addFunction = this.db.addInfo;
          break;
        case 'parent':
          this.currentFormGroup = Parent.getFormGroup();
          this.getListFunction = this.db.getParentList;
          this.addFunction = this.db.addParent;
          break;
        case 'town':
          this.currentFormGroup = Town.getFormGroup();
          this.getListFunction = this.db.getTownList;
          this.addFunction = this.db.addTown;
          break;
        case 'transfer':
          this.currentFormGroup = Transfer.getFormGroup();
          this.getListFunction = this.db.getTransferList;
          this.addFunction = this.db.addTransfer;
          break;
        case 'type-info-category':
          this.currentFormGroup = TypeInfoCategory.getFormGroup();
          this.getListFunction = this.db.getTypeInfoCategoryList;
          this.addFunction = this.db.addTypeInfoCategory;
          break;
        default:
          this.currentFormGroup = null;
          this.getListFunction = async () => {};
          this.addFunction = async () => {};
      }
      this.getListFunction = this.getListFunction.bind(this.db);
      this.addFunction = this.addFunction.bind(this.db);
      this.currentData = await this.getListFunction();
    });
  }

  get tableData() {
    return new MatTableDataSource(this.currentData || []);
  }

  get formControlNames() {
    return Object.keys(this.currentFormGroup.value);
  }

  get displayedColumns() {
    return ['select', ...this.formControlNames, 'edit'];
  }

  ngOnDestroy() {
    this.urlSubscription.unsubscribe();
  }

  submitForm() {
    if (this.currentFormGroup.invalid) {
      return;
    }
    console.log(this.currentFormGroup.value);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableData.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.tableData.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.position + 1}`;
  }

  deleteSelected() {
    if (this.selection.isEmpty()) {
      return;
    }
    console.log(this.selection.selected);
  }

  editItem(i) {
    console.log(i);
  }
}
