import { Component, OnInit } from '@angular/core';
import { Link } from '../../link';

@Component({
  selector: 'app-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.scss']
})
export class ModelsPageComponent implements OnInit {
  links: Link[] = [{ title: 'Ученик', href: 'student' }];

  constructor() {}

  ngOnInit() {}
}
