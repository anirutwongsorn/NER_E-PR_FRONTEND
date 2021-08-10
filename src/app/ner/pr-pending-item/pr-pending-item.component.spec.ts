import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrPendingItemComponent } from './pr-pending-item.component';

describe('PrPendingItemComponent', () => {
  let component: PrPendingItemComponent;
  let fixture: ComponentFixture<PrPendingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrPendingItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrPendingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
