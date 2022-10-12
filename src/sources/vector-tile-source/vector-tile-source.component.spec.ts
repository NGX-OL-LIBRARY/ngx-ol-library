import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolVectorTileSourceComponent } from './vector-tile-source.component';

describe('NolVectorTileSourceComponent', () => {
  let component: NolVectorTileSourceComponent;
  let fixture: ComponentFixture<NolVectorTileSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolVectorTileSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolVectorTileSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
