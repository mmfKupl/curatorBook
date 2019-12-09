import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SPCharacteristicComponent } from './spcharacteristic.component';

describe('SPCharacteristicComponent', () => {
  let component: SPCharacteristicComponent;
  let fixture: ComponentFixture<SPCharacteristicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SPCharacteristicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SPCharacteristicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
