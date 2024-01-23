import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolLayerGroupComponent } from './layer-group.component';

describe('NolLayerGroupComponent', () => {
  let component: NolLayerGroupComponent;
  let fixture: ComponentFixture<NolLayerGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolLayerGroupComponent]
    });
    fixture = TestBed.createComponent(NolLayerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
