import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolDblClickDragZoomInteractionComponent } from './dblclick-drag-zoom-interaction.component';

describe('NolDblClickDragZoomInteractionComponent', () => {
  let component: NolDblClickDragZoomInteractionComponent;
  let fixture: ComponentFixture<NolDblClickDragZoomInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolDblClickDragZoomInteractionComponent]
    });
    fixture = TestBed.createComponent(NolDblClickDragZoomInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
