import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSugerenciaComponent } from './info-sugerencia.component';

describe('InfoSugerenciaComponent', () => {
  let component: InfoSugerenciaComponent;
  let fixture: ComponentFixture<InfoSugerenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoSugerenciaComponent]
    });
    fixture = TestBed.createComponent(InfoSugerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
