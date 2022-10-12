import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolHeatmapLayerComponent } from './heatmap-layer.component';

describe('NolHeatmapLayerComponent', () => {
  let component: NolHeatmapLayerComponent;
  let fixture: ComponentFixture<NolHeatmapLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolHeatmapLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolHeatmapLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
