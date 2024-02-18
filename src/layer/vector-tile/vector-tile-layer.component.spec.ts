import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolVectorTileLayerComponent } from './vector-tile-layer.component';

describe('NolVectorTileLayerComponent', () => {
  let component: NolVectorTileLayerComponent;
  let fixture: ComponentFixture<NolVectorTileLayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolVectorTileLayerComponent]
    });
    fixture = TestBed.createComponent(NolVectorTileLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
