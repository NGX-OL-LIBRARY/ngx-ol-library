import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolVectorTileSourceComponent } from './vector-tile-source.component';

describe('NolVectorTileSourceComponent', () => {
  let component: NolVectorTileSourceComponent;
  let fixture: ComponentFixture<NolVectorTileSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolVectorTileSourceComponent]
    });
    fixture = TestBed.createComponent(NolVectorTileSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
