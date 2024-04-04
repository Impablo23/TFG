import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteZonaComponent } from './delete-zona.component';

describe('DeleteZonaComponent', () => {
  let component: DeleteZonaComponent;
  let fixture: ComponentFixture<DeleteZonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteZonaComponent]
    });
    fixture = TestBed.createComponent(DeleteZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
