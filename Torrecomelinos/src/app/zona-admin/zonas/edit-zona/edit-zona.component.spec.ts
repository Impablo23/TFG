import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditZonaComponent } from './edit-zona.component';

describe('EditZonaComponent', () => {
  let component: EditZonaComponent;
  let fixture: ComponentFixture<EditZonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditZonaComponent]
    });
    fixture = TestBed.createComponent(EditZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
