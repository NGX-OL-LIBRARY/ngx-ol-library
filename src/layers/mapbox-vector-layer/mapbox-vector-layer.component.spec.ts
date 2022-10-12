import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolMapboxVectorLayerComponent } from './mapbox-vector-layer.component';

describe('NolMapboxVectorLayerComponent', () => {
  let component: NolMapboxVectorLayerComponent;
  let fixture: ComponentFixture<NolMapboxVectorLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolMapboxVectorLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolMapboxVectorLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
