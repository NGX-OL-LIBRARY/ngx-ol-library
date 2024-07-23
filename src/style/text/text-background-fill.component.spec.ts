import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolTextBackgroundFillComponent } from './text-background-fill.component';

describe('NolTextBackgroundFillComponent', () => {
  let component: NolTextBackgroundFillComponent;
  let fixture: ComponentFixture<NolTextBackgroundFillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolTextBackgroundFillComponent]
    });
    fixture = TestBed.createComponent(NolTextBackgroundFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
