import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporadasRelojComponent } from './temporadas-reloj.component';

describe('TemporadasRelojComponent', () => {
  let component: TemporadasRelojComponent;
  let fixture: ComponentFixture<TemporadasRelojComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporadasRelojComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporadasRelojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
