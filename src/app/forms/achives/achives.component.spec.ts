import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchivesComponent } from './achives.component';

describe('AchivesComponent', () => {
  let component: AchivesComponent;
  let fixture: ComponentFixture<AchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
