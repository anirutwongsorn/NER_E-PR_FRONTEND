import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrPendingDeptComponent } from './pr-pending-dept.component';

describe('PrPendingDeptComponent', () => {
  let component: PrPendingDeptComponent;
  let fixture: ComponentFixture<PrPendingDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrPendingDeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrPendingDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
