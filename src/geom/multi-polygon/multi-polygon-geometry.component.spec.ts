import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolMultiPolygonGeometryComponent } from './multi-polygon-geometry.component';

describe('NolMultiPolygonGeometryComponent', () => {
  let component: NolMultiPolygonGeometryComponent;
  let fixture: ComponentFixture<NolMultiPolygonGeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolMultiPolygonGeometryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolMultiPolygonGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
