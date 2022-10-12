import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolControlComponent } from './control.component';

describe('NolControlComponent', () => {
  let component: NolControlComponent;
  let fixture: ComponentFixture<NolControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
