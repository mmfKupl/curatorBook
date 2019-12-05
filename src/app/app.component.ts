import { Component, OnInit, NgZone } from '@angular/core';
import { ElectronService } from './core/services';
import { DatabaseService } from './database.service';
import { remote } from 'electron';
import { ActivatedRoute, Router } from '@angular/router';
const { Menu, MenuItem, app } = remote;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public electronService: ElectronService,
    private database: DatabaseService,
    private router: Router,
    private ngZone: NgZone
  ) {
    console.log(this.database);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() {
    const menu = Menu.buildFromTemplate([
      {
        label: 'Меню',
        submenu: [
          {
            label: 'Главная',
            click: () => {
              this.ngZone.run(() => {
                this.navigateTo('');
              });
            }
          },
          {
            label: 'Модели данных',
            click: () => {
              this.ngZone.run(() => {
                this.navigateTo('models');
              });
            }
          }
        ]
      },
      {
        label: 'Помощь',
        accelerator: 'f1',
        click: () => {
          console.log('Помощь');
        }
      },
      {
        label: 'Выход',
        click: () => {
          app.quit();
        }
      }
    ]);
    Menu.setApplicationMenu(menu);
  }
}
