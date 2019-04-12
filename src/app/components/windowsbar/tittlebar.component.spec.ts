import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TittlebarComponent } from './tittlebar.component';

describe('TittlebarComponent', () => {
  let component: TittlebarComponent;
  let fixture: ComponentFixture<TittlebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TittlebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TittlebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
