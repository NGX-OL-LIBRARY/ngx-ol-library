import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolImageWMSSourceComponent } from './image-wms-source.component';

describe('NolImageWMSSourceComponent', () => {
  let component: NolImageWMSSourceComponent;
  let fixture: ComponentFixture<NolImageWMSSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolImageWMSSourceComponent]
    });
    fixture = TestBed.createComponent(NolImageWMSSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
