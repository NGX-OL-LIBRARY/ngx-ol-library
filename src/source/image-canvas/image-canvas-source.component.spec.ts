import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolImageCanvasSourceComponent } from './image-canvas-source.component';

describe('NolImageCanvasSourceComponent', () => {
  let component: NolImageCanvasSourceComponent;
  let fixture: ComponentFixture<NolImageCanvasSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolImageCanvasSourceComponent]
    });
    fixture = TestBed.createComponent(NolImageCanvasSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
