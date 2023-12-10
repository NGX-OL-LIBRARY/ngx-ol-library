import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolViewComponent } from './view.component';

describe('NolViewComponent', () => {
  let component: NolViewComponent;
  let fixture: ComponentFixture<NolViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NolViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
