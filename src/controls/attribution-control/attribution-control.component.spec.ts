import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolAttributionControlComponent } from './attribution-control.component';

describe('NolAttributionControlComponent', () => {
  let component: NolAttributionControlComponent;
  let fixture: ComponentFixture<NolAttributionControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolAttributionControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolAttributionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
