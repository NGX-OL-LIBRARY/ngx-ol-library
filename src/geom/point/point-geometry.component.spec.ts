import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolPointGeometryComponent } from './point-geometry.component';

describe('NolPointGeometryComponent', () => {
  let component: NolPointGeometryComponent;
  let fixture: ComponentFixture<NolPointGeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NolPointGeometryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolPointGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
