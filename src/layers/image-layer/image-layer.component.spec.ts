import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolImageLayerComponent } from './image-layer.component';

describe('NolImageLayerComponent', () => {
  let component: NolImageLayerComponent;
  let fixture: ComponentFixture<NolImageLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolImageLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolImageLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
