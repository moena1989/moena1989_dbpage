import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoIngresoRelojComponent } from './nuevo-ingreso-reloj.component';

describe('NuevoIngresoRelojComponent', () => {
  let component: NuevoIngresoRelojComponent;
  let fixture: ComponentFixture<NuevoIngresoRelojComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoIngresoRelojComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoIngresoRelojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
