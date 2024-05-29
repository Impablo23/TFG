import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoriaComponent } from './edit-categoria.component';

describe('EditCategoriaComponent', () => {
  let component: EditCategoriaComponent;
  let fixture: ComponentFixture<EditCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCategoriaComponent]
    });
    fixture = TestBed.createComponent(EditCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
