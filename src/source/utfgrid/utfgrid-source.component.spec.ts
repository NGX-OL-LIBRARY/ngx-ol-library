import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolUTFGridSourceComponent } from './utfgrid-source.component';

describe('NolUTFGridSourceComponent', () => {
  let component: NolUTFGridSourceComponent;
  let fixture: ComponentFixture<NolUTFGridSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolUTFGridSourceComponent]
    });
    fixture = TestBed.createComponent(NolUTFGridSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
