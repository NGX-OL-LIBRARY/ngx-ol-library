import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolBaseVectorLayerComponent } from './base-vector-layer.component';

describe('NolBaseVectorLayerComponent', () => {
  let component: NolBaseVectorLayerComponent;
  let fixture: ComponentFixture<NolBaseVectorLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolBaseVectorLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolBaseVectorLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
