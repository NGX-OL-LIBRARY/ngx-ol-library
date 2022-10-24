import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolUrlTileSourceComponent } from './url-tile-source.component';

describe('NolUrlTileSourceComponent', () => {
  let component: NolUrlTileSourceComponent;
  let fixture: ComponentFixture<NolUrlTileSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolUrlTileSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolUrlTileSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
