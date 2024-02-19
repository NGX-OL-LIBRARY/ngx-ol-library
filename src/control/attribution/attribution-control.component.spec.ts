import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolAttributionControlComponent } from './attribution-control.component';

describe('NolAttributionControlComponent', () => {
  let component: NolAttributionControlComponent;
  let fixture: ComponentFixture<NolAttributionControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolAttributionControlComponent]
    });
    fixture = TestBed.createComponent(NolAttributionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
