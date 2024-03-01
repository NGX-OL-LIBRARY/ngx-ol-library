import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolDoubleClickZoomInteractionComponent } from './double-click-zoom-interaction.component';

describe('NolDoubleClickZoomInteractionComponent', () => {
  let component: NolDoubleClickZoomInteractionComponent;
  let fixture: ComponentFixture<NolDoubleClickZoomInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolDoubleClickZoomInteractionComponent]
    });
    fixture = TestBed.createComponent(NolDoubleClickZoomInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
