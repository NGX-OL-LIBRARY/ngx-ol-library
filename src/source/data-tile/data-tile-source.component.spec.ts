import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolDataTileSourceComponent } from './data-tile-source.component';

describe('NolDataTileSourceComponent', () => {
  let component: NolDataTileSourceComponent;
  let fixture: ComponentFixture<NolDataTileSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolDataTileSourceComponent]
    });
    fixture = TestBed.createComponent(NolDataTileSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
