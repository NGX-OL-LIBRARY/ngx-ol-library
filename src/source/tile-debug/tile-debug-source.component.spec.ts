import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolTileDebugSourceComponent } from './tile-debug-source.component';

describe('NolTileDebugSourceComponent', () => {
  let component: NolTileDebugSourceComponent;
  let fixture: ComponentFixture<NolTileDebugSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolTileDebugSourceComponent]
    });
    fixture = TestBed.createComponent(NolTileDebugSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
