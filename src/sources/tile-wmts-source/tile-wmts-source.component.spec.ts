import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolTileWMTSSourceComponent } from './tile-wmts-source.component';

describe('NolTileWMTSSourceComponent', () => {
  let component: NolTileWMTSSourceComponent;
  let fixture: ComponentFixture<NolTileWMTSSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolTileWMTSSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolTileWMTSSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
