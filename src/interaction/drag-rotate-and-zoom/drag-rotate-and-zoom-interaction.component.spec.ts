import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolDragRotateAndZoomInteractionComponent } from './drag-rotate-and-zoom-interaction.component';

describe('NolDragRotateAndZoomInteractionComponent', () => {
  let component: NolDragRotateAndZoomInteractionComponent;
  let fixture: ComponentFixture<NolDragRotateAndZoomInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolDragRotateAndZoomInteractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolDragRotateAndZoomInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
