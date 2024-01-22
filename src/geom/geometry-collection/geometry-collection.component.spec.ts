import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolGeometryCollectionComponent } from './geometry-collection.component';

describe('NolGeometryCollectionComponent', () => {
  let component: NolGeometryCollectionComponent;
  let fixture: ComponentFixture<NolGeometryCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NolGeometryCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolGeometryCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
