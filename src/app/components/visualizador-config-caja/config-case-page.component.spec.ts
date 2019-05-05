import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCasePageComponent } from './config-case-page.component';

describe('ConfigCasePageComponent', () => {
  let component: ConfigCasePageComponent;
  let fixture: ComponentFixture<ConfigCasePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigCasePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigCasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
