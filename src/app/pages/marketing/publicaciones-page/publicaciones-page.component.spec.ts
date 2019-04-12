import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesPageComponent } from './publicaciones-page.component';

describe('PublicacionesPageComponent', () => {
  let component: PublicacionesPageComponent;
  let fixture: ComponentFixture<PublicacionesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicacionesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
