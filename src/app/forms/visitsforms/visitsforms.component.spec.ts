import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsformsComponent } from './visitsforms.component';

describe('VisitsformsComponent', () => {
  let component: VisitsformsComponent;
  let fixture: ComponentFixture<VisitsformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
