import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurPrOverviewComponent } from './pur-pr-overview.component';

describe('PurPrOverviewComponent', () => {
  let component: PurPrOverviewComponent;
  let fixture: ComponentFixture<PurPrOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurPrOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurPrOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
