import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSugerenciaComponent } from './delete-sugerencia.component';

describe('DeleteSugerenciaComponent', () => {
  let component: DeleteSugerenciaComponent;
  let fixture: ComponentFixture<DeleteSugerenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSugerenciaComponent]
    });
    fixture = TestBed.createComponent(DeleteSugerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
