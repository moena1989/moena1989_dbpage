import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPageComponent } from './registro-page.component';

describe('RegistroPageComponent', () => {
  let component: RegistroPageComponent;
  let fixture: ComponentFixture<RegistroPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
