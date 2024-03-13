import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolPinchZoomInteractionComponent } from './pinch-zoom-interaction.component';

describe('NolPinchZoomInteractionComponent', () => {
  let component: NolPinchZoomInteractionComponent;
  let fixture: ComponentFixture<NolPinchZoomInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolPinchZoomInteractionComponent]
    });
    fixture = TestBed.createComponent(NolPinchZoomInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
