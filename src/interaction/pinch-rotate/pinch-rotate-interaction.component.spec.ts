import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolPinchRotateInteractionComponent } from './pinch-rotate-interaction.component';

describe('NolPinchRotateInteractionComponent', () => {
  let component: NolPinchRotateInteractionComponent;
  let fixture: ComponentFixture<NolPinchRotateInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolPinchRotateInteractionComponent]
    });
    fixture = TestBed.createComponent(NolPinchRotateInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
