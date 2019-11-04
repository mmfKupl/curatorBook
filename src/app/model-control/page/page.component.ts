import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from '../../models/student';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
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
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { SelectionModel } from '@angular/cdk/collections';
import { FormType } from '../../models/form-type';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  isEdit = false;
  oldValue: any;

  getListFunction: any;
  addFunction: any;
  deleteFunction: any;

  currentData: BaseModel[] = [];
  currentFormTypes: FormType[] = [];
  currentFormGroup: FormGroup;

  urlSubscription: Subscription;
  selection = new SelectionModel<BaseModel>(true, []);

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.urlSubscription = this.route.url.subscribe(async url => {
      const [current] = url;
      const currentPath = current ? current.path : '';
      switch (currentPath) {
        case 'student':
          this.currentFormTypes = Student.getTypes();
          this.getListFunction = this.db.getStudentList;
          this.deleteFunction = this.db.deleteStudent;
          this.addFunction = this.db.addStudent;
          break;
        case 'study-group':
          this.currentFormTypes = StudyGroup.getTypes();
          this.getListFunction = this.db.getStudyGroupList;
          this.deleteFunction = this.db.deleteStudyGroup;
          this.addFunction = this.db.addStudyGroup;
          break;
        case 'employee':
          this.currentFormTypes = Employee.getTypes();
          this.getListFunction = this.db.getEmployeeList;
          this.deleteFunction = this.db.deleteEmployee;
          this.addFunction = this.db.addEmployee;
          break;
        case 'employee-status':
          this.currentFormTypes = EmployeeStatus.getTypes();
          this.getListFunction = this.db.getEmployeeStatusList;
          this.deleteFunction = this.db.deleteEmployeeStatus;
          this.addFunction = this.db.addEmployeeStatus;
          break;
        case 'info-category':
          this.currentFormTypes = InfoCategory.getTypes();
          this.getListFunction = this.db.getInfoCategoryList;
          this.deleteFunction = this.db.deleteInfoCategory;
          this.addFunction = this.db.addInfoCategory;
          break;
        case 'info':
          this.currentFormTypes = Info.getTypes();
          this.getListFunction = this.db.getInfoList;
          this.deleteFunction = this.db.deleteInfo;
          this.addFunction = this.db.addInfo;
          break;
        case 'parent':
          this.currentFormTypes = Parent.getTypes();
          this.getListFunction = this.db.getParentList;
          this.deleteFunction = this.db.deleteParent;
          this.addFunction = this.db.addParent;
          break;
        case 'town':
          this.currentFormTypes = Town.getTypes();
          this.getListFunction = this.db.getTownList;
          this.deleteFunction = this.db.deleteTown;
          this.addFunction = this.db.addTown;
          break;
        case 'transfer':
          this.currentFormTypes = Transfer.getTypes();
          this.getListFunction = this.db.getTransferList;
          this.deleteFunction = this.db.deleteTransfer;
          this.addFunction = this.db.addTransfer;
          break;
        case 'type-info-category':
          this.currentFormTypes = TypeInfoCategory.getTypes();
          this.getListFunction = this.db.getTypeInfoCategoryList;
          this.deleteFunction = this.db.deleteTypeInfoCategory;
          this.addFunction = this.db.addTypeInfoCategory;
          break;
        default:
          this.currentFormGroup = null;
          this.currentFormTypes = [];
          this.deleteFunction = async () => {};
          this.getListFunction = async () => {};
          this.addFunction = async () => {};
      }
      this.getListFunction = this.getListFunction.bind(this.db);
      if (this.currentFormTypes.length) {
        this.currentFormGroup = this.toFormGroup(this.currentFormTypes);
      }
      this.addFunction = this.addFunction.bind(this.db);
      this.deleteFunction = this.deleteFunction.bind(this.db);
      this.currentData = await this.getListFunction();
    });
  }

  opentSnackBar(message: string) {
    this.snackBar.open(message, 'Понятно', {
      duration: 4000
    });
  }

  toFormGroup(formTypes: FormType[]): FormGroup {
    const fg = {};

    formTypes.forEach(type => {
      fg[type.key] = new FormControl(null, type.validators);
    });

    return new FormGroup(fg);
  }

  get tableData() {
    return new MatTableDataSource(this.currentData || []);
  }

  get formControlNames() {
    return this.currentFormGroup
      ? Object.keys(this.currentFormGroup.value)
      : [];
  }

  get displayedColumns() {
    return ['select', ...this.formControlNames, 'edit'];
  }

  ngOnDestroy() {
    this.urlSubscription.unsubscribe();
  }

  submitForm() {
    if (this.currentFormGroup.invalid) {
      this.opentSnackBar('Данные введены неверно');
      return;
    }
    console.log(this.currentFormGroup.value);
    if (this.isEdit) {
      // this.db
      //   .updateTown(this.currentFormGroup.value, this.oldValue)
      //   .then(async res => {
      //     console.log(res);
      //     this.opentSnackBar('Данные успешно обновлены');
      //     this.currentData = await this.getListFunction();
      //     this.currentFormGroup.reset();
      //   })
      //   .catch(err => {
      //     console.error(err);
      //     this.opentSnackBar(err.message);
      //   })
      //   .finally(() => {
      //     this.isEdit = false;
      //     this.oldValue = {};
      //   });
      return;
    }
    this.addFunction(this.currentFormGroup.value)
      .then(async res => {
        console.log(res);
        this.opentSnackBar('Данные успешно добавлены');
        this.currentData = await this.getListFunction();
        this.currentFormGroup.reset();
      })
      .catch(err => {
        console.error(err);
        this.opentSnackBar(err.message);
      });
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

    this.selection.selected.forEach(item => {
      this.deleteItem(null, item);
    });
    this.selection.clear();
  }

  editItem(i) {
    this.currentFormGroup.patchValue(this.tableData.data[i]);
    this.isEdit = true;
    this.oldValue = { ...this.currentFormGroup.value };
  }

  deleteItem(event?: Event, value?: object) {
    if (event) {
      event.preventDefault();
    }
    const curValue = value ? value : this.currentFormGroup.value;
    if (!value) {
      this.opentSnackBar('Данные введены неверно');
      return;
    }
    this.deleteFunction(curValue)
      .then(async res => {
        console.log(res);
        this.opentSnackBar('Данные успешно удалены');
        this.currentData = await this.getListFunction();
        this.currentFormGroup.reset();
      })
      .catch(err => {
        console.error(err);
        this.opentSnackBar(err.message);
      });
  }

  async updateTable() {
    this.currentData = await this.getListFunction();
  }
}
