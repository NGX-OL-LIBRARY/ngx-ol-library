import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolLayerComponent } from './layer.component';

describe('NolLayerComponent', () => {
  let component: NolLayerComponent;
  let fixture: ComponentFixture<NolLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
