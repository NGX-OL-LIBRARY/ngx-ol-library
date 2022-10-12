import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolCircleStyleComponent } from './circle-style.component';

describe('NolCircleStyleComponent', () => {
  let component: NolCircleStyleComponent;
  let fixture: ComponentFixture<NolCircleStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolCircleStyleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolCircleStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
