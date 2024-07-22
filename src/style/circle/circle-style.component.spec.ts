import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolCircleStyleComponent } from './circle-style.component';

describe('NolCircleStyleComponent', () => {
  let component: NolCircleStyleComponent;
  let fixture: ComponentFixture<NolCircleStyleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolCircleStyleComponent]
    });
    fixture = TestBed.createComponent(NolCircleStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
