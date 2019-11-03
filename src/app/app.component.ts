import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public electronService: ElectronService,
    private database: DatabaseService
  ) {
    console.log(this.database);
  }

  ngOnInit() {}
}
