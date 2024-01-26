import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolTileWMSSourceComponent } from './tile-wms-source.component';

describe('NolTileWMSSourceComponent', () => {
  let component: NolTileWMSSourceComponent;
  let fixture: ComponentFixture<NolTileWMSSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolTileWMSSourceComponent]
    });
    fixture = TestBed.createComponent(NolTileWMSSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
