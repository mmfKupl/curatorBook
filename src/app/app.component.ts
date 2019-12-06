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
        submenu: Menu.buildFromTemplate([
          {
            label: 'Формы',
            submenu: Menu.buildFromTemplate([
              {
                label: 'Список учащихся учебной группы',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('');
                  });
                }
              },
              {
                label: 'Социально-педагогическая характеристика',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('');
                  });
                }
              },
              {
                label: 'Актив учебной группы',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('');
                  });
                }
              },
              {
                label: 'Достижения учебной группы',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('');
                  });
                }
              },
              {
                label: 'Отчисления за период обучения',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('');
                  });
                }
              },
              {
                label: 'Карта персонифицированного учета',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('');
                  });
                }
              },
              {
                label: 'Рекомендации специалистов',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('');
                  });
                }
              },
              {
                label: 'Учет посещаемости родителями проводимых мероприятий',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('');
                  });
                }
              },
              {
                label: 'Формы взаимодействия с родителями учащихся',
                click: () => {
                  this.ngZone.run(() => {
                    this.navigateTo('');
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
            label: 'Перезайти как...'
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
            label: 'принудительная перезагрузка',
            role: 'forceReload'
          })
        ])
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
