import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolClusterSourceComponent } from './cluster-source.component';

describe('NolClusterSourceComponent', () => {
  let component: NolClusterSourceComponent;
  let fixture: ComponentFixture<NolClusterSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolClusterSourceComponent]
    });
    fixture = TestBed.createComponent(NolClusterSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
