import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentosPageComponent } from './experimentos-page.component';

describe('ExperimentosPageComponent', () => {
  let component: ExperimentosPageComponent;
  let fixture: ComponentFixture<ExperimentosPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentosPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
