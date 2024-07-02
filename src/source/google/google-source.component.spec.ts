import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolGoogleSourceComponent } from './google-source.component';

describe('NolGoogleSourceComponent', () => {
  let component: NolGoogleSourceComponent;
  let fixture: ComponentFixture<NolGoogleSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolGoogleSourceComponent]
    });
    fixture = TestBed.createComponent(NolGoogleSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
