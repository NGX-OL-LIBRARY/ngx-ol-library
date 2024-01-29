import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiaMapsSourceComponent } from './stadia-maps-source.component';

describe('StadiaMapsSourceComponent', () => {
  let component: StadiaMapsSourceComponent;
  let fixture: ComponentFixture<StadiaMapsSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StadiaMapsSourceComponent]
    });
    fixture = TestBed.createComponent(StadiaMapsSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
