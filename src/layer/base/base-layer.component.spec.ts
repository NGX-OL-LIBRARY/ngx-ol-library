import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolBaseLayerComponent } from './base-layer.component';

describe('NolBaseLayerComponent', () => {
  let component: NolBaseLayerComponent;
  let fixture: ComponentFixture<NolBaseLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolBaseLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolBaseLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
