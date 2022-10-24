import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolClusterSourceComponent } from './cluster-source.component';

describe('NolClusterSourceComponent', () => {
  let component: NolClusterSourceComponent;
  let fixture: ComponentFixture<NolClusterSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolClusterSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolClusterSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
