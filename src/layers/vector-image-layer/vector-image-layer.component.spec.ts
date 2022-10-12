import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolVectorImageLayerComponent } from './vector-image-layer.component';

describe('NolVectorImageLayerComponent', () => {
  let component: NolVectorImageLayerComponent;
  let fixture: ComponentFixture<NolVectorImageLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolVectorImageLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolVectorImageLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
