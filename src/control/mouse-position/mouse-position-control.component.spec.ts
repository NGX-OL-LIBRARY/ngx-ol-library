import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolMousePositionControlComponent } from './mouse-position-control.component';

describe('NolMousePositionControlComponent', () => {
  let component: NolMousePositionControlComponent;
  let fixture: ComponentFixture<NolMousePositionControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolMousePositionControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolMousePositionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
