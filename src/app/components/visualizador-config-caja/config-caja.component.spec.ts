import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCajaComponent } from './config-caja.component';

describe('ConfigCajaComponent', () => {
  let component: ConfigCajaComponent;
  let fixture: ComponentFixture<ConfigCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
