import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolGraticuleLayerComponent } from './graticule-layer.component';

describe('NolGraticuleLayerComponent', () => {
  let component: NolGraticuleLayerComponent;
  let fixture: ComponentFixture<NolGraticuleLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolGraticuleLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolGraticuleLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
