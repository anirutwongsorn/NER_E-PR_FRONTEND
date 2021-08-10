import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PrWorkorder } from 'src/app/models/ner/pr_workorder';
import { DataProviderService } from 'src/app/Services/data-provider.service';
import { NerService } from 'src/app/Services/ner.service';
import Swal, { SweetAlertGrow } from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { PoDialogComponent } from '../po-dialog/po-dialog.component';
import { PoData } from 'src/app/models/ner/dialog_po';
import { PrCancelBody } from 'src/app/models/ner/pr_cancel';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pur-pr-actions',
  templateUrl: './pur-pr-actions.component.html',
  styleUrls: ['./pur-pr-actions.component.css'],
})
export class PurPrActionsComponent implements OnInit {
  constructor(
    private activateRoute: ActivatedRoute,
    private nerService: NerService,
    private dataProvider: DataProviderService,
    private dialog: MatDialog,
    private location: Location,
    private snackBar: MatSnackBar
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  prno: string = '';
  fullName: string = this.dataProvider.getScope().fullName;
  deptCode: string = this.dataProvider.getScope().deptCode;
  dateCreated: string = this.dataProvider.getScope().dateCreated;
  timeCreated: string = this.dataProvider.getScope().timeCreated;
  prType: string = this.dataProvider.getScope().prType;
  dateNeed: string = this.dataProvider.getScope().dateNeed;
  status: string = this.dataProvider.getScope().status;
  remark: string = this.dataProvider.getScope().remark;
  approveDate: string = this.dataProvider.getScope().approveDate;
  approveName: string = this.dataProvider.getScope().approveName;
  approveTime: string = this.dataProvider.getScope().approveTime;
  acknDate: string = this.dataProvider.getScope().acknDate;
  acknName: string = this.dataProvider.getScope().acknName;
  isAckn: boolean = this.dataProvider.getScope().isAckn;

  //=============Config snackbar==============
  config: MatSnackBarConfig = {
    duration: 3000,
    panelClass: ['snackbar', 'snackbar-error'],
  };

  // poNo: string = '';
  // poDate: string = '';
  poData?: PoData;

  displayedColumn: string[] = [
    'pdCode',
    'pdDetail',
    'qty',
    'keeping',
    'bdgCode',
    'objective',
    'po',
    'action',
  ];
  dataSource = new MatTableDataSource<PrWorkorder>();

  ngOnInit(): void {
    this.activateRoute.params.subscribe((param) => {
      this.prno = param.prno;
    });
    this.getPrdescription();
  }

  getPrdescription() {
    this.nerService.getPurchaseRequestByDocNo(this.prno).subscribe(
      (data) => {
        //console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator!;
      },
      (err) => {
        alert(err);
      }
    );
  }

  acknowledgePr() {
    if (this.isAckn === true) {
      this.snackBar.open(
        'คุณทำรายการรับ PR เข้าระบบแล้ว!',
        undefined,
        this.config
      );
      return;
    }

    Swal.fire({
      title: this.prno,
      text: 'ยืนยันการรับ PR เข้าสู่ระบบจัดซื้อ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยันการทำรายการ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.nerService.acknowledgePR(this.prno).subscribe(
          (_) => {
            this.getPrdescription();
          },
          (err) => {
            alert(err);
          }
        );
      }
    });
  }

  cancelPr() {
    if (!this.prno) {
      return;
    }

    let cancelModel = new PrCancelBody();
    cancelModel.prNo = this.prno;
    cancelModel.oldStatus = this.status;
    cancelModel.newStatus = 'canceled';
    cancelModel.operationName = 'ฝ่ายจัดซื้อ';

    Swal.fire({
      title: this.prno,
      text: 'คุณต้องการยกเลิกใบขอซื้อ!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยันการทำรายการ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.nerService.CancelPurchaseRequest(cancelModel).subscribe(
          (_) => {
            this.location.back();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  returnToPending() {
    if (!this.prno) {
      return;
    }

    let cancelModel = new PrCancelBody();
    cancelModel.prNo = this.prno;
    cancelModel.oldStatus = this.status;
    cancelModel.newStatus = 'pending';
    cancelModel.operationName = 'ฝ่ายจัดซื้อ';

    Swal.fire({
      title: this.prno,
      text: 'คุณต้องการคืนค่าเริ่มต้นใบขอซื้อ!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยันการทำรายการ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.nerService.CancelPurchaseRequest(cancelModel).subscribe(
          (_) => {
            this.location.back();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  approvePr() {
    if (!this.prno) {
      return;
    }

    let cancelModel = new PrCancelBody();
    cancelModel.prNo = this.prno;
    cancelModel.oldStatus = this.status;
    cancelModel.newStatus = 'approved';
    cancelModel.operationName = 'ฝ่ายจัดซื้อ';

    Swal.fire({
      title: this.prno,
      text: 'คุณต้องการปิดการสั่งซื้อ',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยันการทำรายการ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.nerService.CancelPurchaseRequest(cancelModel).subscribe(
          (_) => {
            this.location.back();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  onCancelItem(data: PrWorkorder) {
    Swal.fire({
      title: data.pdDetail,
      text: 'คุณต้องการยกเลิกรายการขอซื้อ!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยันการทำรายการ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.nerService.updatePrItemStatus(data.item).subscribe((_) => {
          this.getPrdescription();
        });
      }
    });
  }

  openDialog(item: number): void {
    const dialogRef = this.dialog.open(PoDialogComponent, {
      width: '350px',
      data: { prNo: this.prno, item: item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //alert(result);
      if (result) {
        this.getPrdescription();
      }
    });
  }

  backToPrevious() {
    this.location.back();
  }
}
