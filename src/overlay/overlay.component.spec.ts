import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolOverlayComponent } from './overlay.component';

describe('NolOverlayComponent', () => {
  let component: NolOverlayComponent;
  let fixture: ComponentFixture<NolOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolOverlayComponent]
    });
    fixture = TestBed.createComponent(NolOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
