import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolTileSourceComponent } from './tile-source.component';

describe('NolTileSourceComponent', () => {
  let component: NolTileSourceComponent;
  let fixture: ComponentFixture<NolTileSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolTileSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolTileSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
