import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolStyleCollectionComponent } from './style-collection.component';

describe('NolStyleCollectionComponent', () => {
  let component: NolStyleCollectionComponent;
  let fixture: ComponentFixture<NolStyleCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NolStyleCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolStyleCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
