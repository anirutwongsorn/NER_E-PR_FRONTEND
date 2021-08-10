import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PoData } from 'src/app/models/ner/dialog_po';
import { NerService } from 'src/app/Services/ner.service';

@Component({
  selector: 'app-po-dialog',
  templateUrl: './po-dialog.component.html',
  styleUrls: ['./po-dialog.component.css'],
})
export class PoDialogComponent implements OnInit {
  constructor(
    private nerService: NerService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PoData
  ) {}

  configSnack: MatSnackBarConfig = {
    duration: 5000,
    verticalPosition: 'top',
    horizontalPosition: 'end',
    panelClass: ['snackbar', 'snackbar-success'],
  };

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(poForm: NgForm) {
    //alert('invalid');

    if (poForm.invalid) {
      return;
    }
    //alert(JSON.stringify(this.data));
    this.nerService
      .updatePrItemStatus(
        this.data.item,
        this.data.poNo,
        this.data.poDate,
        true
      )
      .subscribe((_) => {
        this.snackBar.open('Save Completed.', undefined, this.configSnack);
      });

    //alert(JSON.stringify(this.data));
    this.dialogRef.close(this.data.poNo);
  }

}
