import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolLinearRingGeometryComponent } from './linear-ring-geometry.component';

describe('NolLinearRingGeometryComponent', () => {
  let component: NolLinearRingGeometryComponent;
  let fixture: ComponentFixture<NolLinearRingGeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NolLinearRingGeometryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolLinearRingGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
