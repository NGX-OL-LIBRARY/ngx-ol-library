import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolVectorSourceComponent } from './vector-source.component';

describe('NolVectorSourceComponent', () => {
  let component: NolVectorSourceComponent;
  let fixture: ComponentFixture<NolVectorSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NolVectorSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolVectorSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
