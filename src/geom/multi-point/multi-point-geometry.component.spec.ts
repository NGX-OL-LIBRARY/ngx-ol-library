import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolMultiPointGeometryComponent } from './multi-point-geometry.component';

describe('NolMultiPointGeometryComponent', () => {
  let component: NolMultiPointGeometryComponent;
  let fixture: ComponentFixture<NolMultiPointGeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolMultiPointGeometryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolMultiPointGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
