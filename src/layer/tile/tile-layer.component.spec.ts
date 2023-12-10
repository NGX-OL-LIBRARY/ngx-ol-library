import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolTileLayerComponent } from './tile-layer.component';

describe('NolTileLayerComponent', () => {
  let component: NolTileLayerComponent;
  let fixture: ComponentFixture<NolTileLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NolTileLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolTileLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
