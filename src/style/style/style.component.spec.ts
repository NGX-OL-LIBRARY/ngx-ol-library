import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolStyleComponent } from './style.component';

describe('NolStyleComponent', () => {
  let component: NolStyleComponent;
  let fixture: ComponentFixture<NolStyleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolStyleComponent]
    });
    fixture = TestBed.createComponent(NolStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
