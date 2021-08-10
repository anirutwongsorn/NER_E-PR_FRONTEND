import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurPrActionsComponent } from './pur-pr-actions.component';

describe('PurPrActionsComponent', () => {
  let component: PurPrActionsComponent;
  let fixture: ComponentFixture<PurPrActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurPrActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurPrActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
