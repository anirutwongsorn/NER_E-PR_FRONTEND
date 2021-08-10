import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoDialogComponent } from './po-dialog.component';

describe('PoDialogComponent', () => {
  let component: PoDialogComponent;
  let fixture: ComponentFixture<PoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
