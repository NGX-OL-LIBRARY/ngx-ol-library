import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolWebGLTileLayerComponent } from './webgl-tile-layer.component';

describe('NolWebGLTileLayerComponent', () => {
  let component: NolWebGLTileLayerComponent;
  let fixture: ComponentFixture<NolWebGLTileLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolWebGLTileLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolWebGLTileLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
