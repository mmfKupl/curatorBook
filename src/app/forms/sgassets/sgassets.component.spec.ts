import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SGAssetsComponent } from './sgassets.component';

describe('SGAssetsComponent', () => {
  let component: SGAssetsComponent;
  let fixture: ComponentFixture<SGAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SGAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SGAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
