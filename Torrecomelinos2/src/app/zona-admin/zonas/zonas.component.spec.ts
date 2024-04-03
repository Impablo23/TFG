import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonasComponent } from './zonas.component';

describe('ZonasComponent', () => {
  let component: ZonasComponent;
  let fixture: ComponentFixture<ZonasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZonasComponent]
    });
    fixture = TestBed.createComponent(ZonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
