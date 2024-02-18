import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolHeatmapLayerComponent } from './heatmap-layer.component';

describe('NolHeatmapLayerComponent', () => {
  let component: NolHeatmapLayerComponent;
  let fixture: ComponentFixture<NolHeatmapLayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolHeatmapLayerComponent]
    });
    fixture = TestBed.createComponent(NolHeatmapLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
