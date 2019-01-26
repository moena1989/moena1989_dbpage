import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoRelojComponent } from './nuevo-reloj.component';

describe('NuevoRelojComponent', () => {
  let component: NuevoRelojComponent;
  let fixture: ComponentFixture<NuevoRelojComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoRelojComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoRelojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
