import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolTileImageSourceComponent } from './tile-image-source.component';

describe('NolTileImageSourceComponent', () => {
  let component: NolTileImageSourceComponent;
  let fixture: ComponentFixture<NolTileImageSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolTileImageSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolTileImageSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
