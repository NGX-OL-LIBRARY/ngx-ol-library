import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolBingMapsSourceComponent } from './bing-maps-source.component';

describe('NolBingMapsSourceComponent', () => {
  let component: NolBingMapsSourceComponent;
  let fixture: ComponentFixture<NolBingMapsSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolBingMapsSourceComponent]
    });
    fixture = TestBed.createComponent(NolBingMapsSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
