import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolTextStyleComponent } from './text-style.component';

describe('NolTextStyleComponent', () => {
  let component: NolTextStyleComponent;
  let fixture: ComponentFixture<NolTextStyleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolTextStyleComponent]
    });
    fixture = TestBed.createComponent(NolTextStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
