import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolPolygonGeometryComponent } from './polygon-geometry.component';

describe('NolPolygonGeometryComponent', () => {
  let component: NolPolygonGeometryComponent;
  let fixture: ComponentFixture<NolPolygonGeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NolPolygonGeometryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolPolygonGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
