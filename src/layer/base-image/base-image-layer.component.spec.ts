import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolBaseImageLayerComponent } from './base-image-layer.component';

describe('NolBaseImageLayerComponent', () => {
  let component: NolBaseImageLayerComponent;
  let fixture: ComponentFixture<NolBaseImageLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolBaseImageLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolBaseImageLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
