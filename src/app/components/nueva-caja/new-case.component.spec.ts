import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { newCaseComponent } from './new-case.component';

describe('newCaseComponent', () => {
  let component: newCaseComponent;
  let fixture: ComponentFixture<newCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ newCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(newCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
