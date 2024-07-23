import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolTextBackgroundStrokeComponent } from './text-background-stroke.component';

describe('NolTextBackgroundStrokeComponent', () => {
  let component: NolTextBackgroundStrokeComponent;
  let fixture: ComponentFixture<NolTextBackgroundStrokeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolTextBackgroundStrokeComponent]
    });
    fixture = TestBed.createComponent(NolTextBackgroundStrokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
