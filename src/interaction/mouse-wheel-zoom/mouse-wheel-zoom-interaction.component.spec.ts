import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolMouseWheelZoomInteractionComponent } from './mouse-wheel-zoom-interaction.component';

describe('NolMouseWheelZoomInteractionComponent', () => {
  let component: NolMouseWheelZoomInteractionComponent;
  let fixture: ComponentFixture<NolMouseWheelZoomInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolMouseWheelZoomInteractionComponent]
    });
    fixture = TestBed.createComponent(NolMouseWheelZoomInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
