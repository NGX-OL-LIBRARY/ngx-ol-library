import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolImageStaticSourceComponent } from './image-static-source.component';

describe('NolImageStaticSourceComponent', () => {
  let component: NolImageStaticSourceComponent;
  let fixture: ComponentFixture<NolImageStaticSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolImageStaticSourceComponent]
    });
    fixture = TestBed.createComponent(NolImageStaticSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
