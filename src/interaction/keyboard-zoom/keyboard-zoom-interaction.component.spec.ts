import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolKeyboardZoomInteractionComponent } from './keyboard-zoom-interaction.component';

describe('NolKeyboardZoomInteractionComponent', () => {
  let component: NolKeyboardZoomInteractionComponent;
  let fixture: ComponentFixture<NolKeyboardZoomInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolKeyboardZoomInteractionComponent]
    });
    fixture = TestBed.createComponent(NolKeyboardZoomInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
