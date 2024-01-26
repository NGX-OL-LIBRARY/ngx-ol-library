import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolWebGLTileLayerComponent } from './webgl-tile-layer.component';

describe('NolWebGLTileLayerComponent', () => {
  let component: NolWebGLTileLayerComponent;
  let fixture: ComponentFixture<NolWebGLTileLayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolWebGLTileLayerComponent]
    });
    fixture = TestBed.createComponent(NolWebGLTileLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
