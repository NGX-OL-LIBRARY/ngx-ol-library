import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolTileJSONSourceComponent } from './tile-json-source.component';

describe('NolTileJSONSourceComponent', () => {
  let component: NolTileJSONSourceComponent;
  let fixture: ComponentFixture<NolTileJSONSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolTileJSONSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolTileJSONSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
