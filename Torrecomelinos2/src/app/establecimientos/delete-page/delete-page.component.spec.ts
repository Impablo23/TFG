import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePageComponent } from './delete-page.component';

describe('DeletePageComponent', () => {
  let component: DeletePageComponent;
  let fixture: ComponentFixture<DeletePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePageComponent]
    });
    fixture = TestBed.createComponent(DeletePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
