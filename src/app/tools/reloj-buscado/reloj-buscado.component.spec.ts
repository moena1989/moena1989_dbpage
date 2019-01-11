import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojBuscadoComponent } from './reloj-buscado.component';

describe('RelojBuscadoComponent', () => {
  let component: RelojBuscadoComponent;
  let fixture: ComponentFixture<RelojBuscadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelojBuscadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelojBuscadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
