import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolImageMapGuideSourceComponent } from './image-map-guide-source.component';

describe('NolImageMapGuideSourceComponent', () => {
  let component: NolImageMapGuideSourceComponent;
  let fixture: ComponentFixture<NolImageMapGuideSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolImageMapGuideSourceComponent]
    });
    fixture = TestBed.createComponent(NolImageMapGuideSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
