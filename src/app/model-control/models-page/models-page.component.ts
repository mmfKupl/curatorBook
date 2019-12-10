import { Component, OnInit } from '@angular/core';
import { Link } from '../../link';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.scss']
})
export class ModelsPageComponent implements OnInit {
  links: Link[] = [
    { title: 'Ученик', href: 'student' },
    { title: 'Группа', href: 'study-group' },
    { title: 'Перевод', href: 'transfer' },
    { title: 'Работник', href: 'employee' },
    { title: 'Статус работника', href: 'employee-status' },
    { title: 'Родитель', href: 'parent' },
    { title: 'Город', href: 'town' },
    { title: 'Информация', href: 'info' },
    { title: 'Категория информации', href: 'info-category' },
    // { title: 'Тип категории информации', href: 'type-info-category' }
  ];

  selectedTab: number;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const f = this.route.snapshot.firstChild.url[0];
    const firsthPath = f ? f.path : '';
    this.selectedTab =
      this.links.findIndex(link => link.href === firsthPath) || 0;
  }

  onTabChange(event: MatTabChangeEvent) {
    this.router.navigate(['models', event.tab.ariaLabel]);
  }
}
