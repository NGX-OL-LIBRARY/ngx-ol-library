import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolFeatureComponent } from './feature.component';

describe('NolFeatureComponent', () => {
  let component: NolFeatureComponent;
  let fixture: ComponentFixture<NolFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NolFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
