import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolKeyboardPanInteractionComponent } from './keyboard-pan-interaction.component';

describe('NolKeyboardPanInteractionComponent', () => {
  let component: NolKeyboardPanInteractionComponent;
  let fixture: ComponentFixture<NolKeyboardPanInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolKeyboardPanInteractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolKeyboardPanInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
