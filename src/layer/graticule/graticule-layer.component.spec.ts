import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolGraticuleLayerComponent } from './graticule-layer.component';

describe('NolGraticuleLayerComponent', () => {
  let component: NolGraticuleLayerComponent;
  let fixture: ComponentFixture<NolGraticuleLayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolGraticuleLayerComponent]
    });
    fixture = TestBed.createComponent(NolGraticuleLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
