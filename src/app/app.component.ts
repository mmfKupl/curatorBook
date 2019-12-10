import { Component, OnInit, NgZone } from '@angular/core';
import { ElectronService } from './core/services';
import { DatabaseService } from './database.service';
import { remote } from 'electron';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
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
    private ngZone: NgZone,
    private as: AuthService
  ) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() {
    const menu = Menu.buildFromTemplate([
      {
        label: 'Меню',
        submenu: Menu.buildFromTemplate([
          {
            label: 'Главная',
            click: () => {
              this.ngZone.run(() => {
                this.navigateTo('');
              });
            }
          },
          {
            label: 'Формы',
            submenu: Menu.buildFromTemplate([
              {
                label: 'Список учащихся учебной группы',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('student-list');
                  });
                }
              },
              {
                label: 'Социально-педагогическая характеристика',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('sp-characteristic');
                  });
                }
              },
              {
                label: 'Актив учебной группы',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('sg-assets');
                  });
                }
              },
              {
                label: 'Достижения учебной группы',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('ac-group');
                  });
                }
              },
              {
                label: 'Отчисления за период обучения',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('groups-lives');
                  });
                }
              },
              {
                label: 'Карта персонифицированного учета',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('card');
                  });
                }
              },
              {
                label: 'Рекомендации специалистов',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('recommendation');
                  });
                }
              },
              {
                label: 'Учет посещаемости родителями проводимых мероприятий',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('visits');
                  });
                }
              },
              {
                label: 'Формы взаимодействия с родителями учащихся',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('visits-forms');
                  });
                }
              }
            ])
          },
          {
            label: 'Модели данных',
            click: () => {
              this.ngZone.run(() => {
                this.navigateTo('models');
              });
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'Выйти',
            click: () => {
              this.ngZone.run(() => {
                this.as.logOut();
                this.navigateTo('auth');
              });
            }
          }
        ])
      },
      {
        label: 'Справка',
        accelerator: 'f1',
        click: () => {
          this.ngZone.run(() => {
            this.navigateTo('help');
          });
        }
      },
      {
        label: 'Окно',
        submenu: Menu.buildFromTemplate([
          new MenuItem({ label: 'Перезагрузка', role: 'reload' }),
          new MenuItem({
            label: 'Принудительная перезагрузка',
            role: 'forceReload'
          })
        ])
      }
    ]);
    Menu.setApplicationMenu(menu);
  }
}
