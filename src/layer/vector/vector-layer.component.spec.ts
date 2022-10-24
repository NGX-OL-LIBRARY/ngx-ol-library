import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolVectorLayerComponent } from './vector-layer.component';

describe('NolVectorLayerComponent', () => {
  let component: NolVectorLayerComponent;
  let fixture: ComponentFixture<NolVectorLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolVectorLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolVectorLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
