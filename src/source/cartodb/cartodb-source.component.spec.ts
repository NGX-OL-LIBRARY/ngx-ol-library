import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolCartoDBSourceComponent } from './cartodb-source.component';

describe('NolCartoDBSourceComponent', () => {
  let component: NolCartoDBSourceComponent;
  let fixture: ComponentFixture<NolCartoDBSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolCartoDBSourceComponent]
    });
    fixture = TestBed.createComponent(NolCartoDBSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
