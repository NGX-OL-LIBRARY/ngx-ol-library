import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolCircleGeometryComponent } from './circle-geometry.component';

describe('NolCircleGeometryComponent', () => {
  let component: NolCircleGeometryComponent;
  let fixture: ComponentFixture<NolCircleGeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NolCircleGeometryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolCircleGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
