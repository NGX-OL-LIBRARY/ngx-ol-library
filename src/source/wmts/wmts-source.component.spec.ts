import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolWMTSSourceComponent } from './wmts-source.component';

describe('NolWMTSSourceComponent', () => {
  let component: NolWMTSSourceComponent;
  let fixture: ComponentFixture<NolWMTSSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolWMTSSourceComponent]
    });
    fixture = TestBed.createComponent(NolWMTSSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
