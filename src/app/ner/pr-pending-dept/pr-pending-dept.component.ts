import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PrCancelBody } from 'src/app/models/ner/pr_cancel';
import { PrHeader } from 'src/app/models/ner/pr_header';
import { DataProviderService } from 'src/app/Services/data-provider.service';
import { NerReportService } from 'src/app/Services/ner-report.service';
import { NerService } from 'src/app/Services/ner.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pr-pending-dept',
  templateUrl: './pr-pending-dept.component.html',
  styleUrls: ['./pr-pending-dept.component.css'],
})
export class PrPendingDeptComponent implements OnInit {
  displayedColumn: string[] = [
    'prNo',
    'prType',
    'fullName',
    'dateCreated',
    'timeCreated',
    'approveName',
    'approveDate',
    'approveTime',
    'itemCount',
    'action',
  ];

  DeptCode: string = '';

  DeptDesc: string = '';

  sumPending: number = 0;
  sumChecked: number = 0;
  sumApproved: number = 0;
  sumCompleted: number = 0;

  dataSource = new MatTableDataSource<PrHeader>();

  textSearch: string = '';

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  constructor(
    private nerService: NerService,
    private nerReportService: NerReportService,
    private activeRoute: ActivatedRoute,
    private dataProvider: DataProviderService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      this.DeptCode = data.deptCode;
    });
    this.feedData();
    this.getNerDepartment();
    this.getOverAllStatus();
  }

  getOverAllStatus() {
    this.nerReportService
      .getPrOverAllSummaryByDept('', this.DeptCode)
      .subscribe((data) => {
        data.map((item) => {
          switch (item.prStatus) {
            case 'pending': {
              this.sumPending = item.prPending;
              break;
            }
            case 'checked': {
              this.sumChecked = item.prPending;
              break;
            }
            case 'approved': {
              this.sumApproved = item.prPending;
              break;
            }
            case 'completed': {
              this.sumCompleted = item.prPending;
              break;
            }
          }
        });
      });
  }

  clearSearch() {
    this.textSearch = '';
    this.search();
    console.log(this.search);
  }

  search(event: any = null) {
    let filterVal = '';
    if (event) {
      filterVal = (event.target as HTMLInputElement).value;
    }
    this.dataSource.filter = filterVal.trim().toLowerCase();
  }

  feedData() {
    //this.loadingService.showSpinner();
    this.nerService.getPurchaseRequestByDeptCode('', this.DeptCode).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator!;
      },
      (error) => {
        console.log(JSON.stringify(error));
      },
      () => {
        console.log('Feed product success');
      }
    );
  }

  getNerDepartment() {
    this.nerReportService.getNerDepartment(this.DeptCode).subscribe((data) => {
      let _dept = data.map((p: any) => {
        if (p.deptCode == this.DeptCode) {
          return p.division;
        }
      });
      this.DeptDesc = _dept.toString();
    });
  }

  cancelPr(prModel: PrHeader) {
    let cancelModel = new PrCancelBody();
    cancelModel.prNo = prModel.prNo;
    cancelModel.oldStatus = prModel.status;
    cancelModel.newStatus = 'canceled';
    cancelModel.operationName = 'อนิรุต วงค์สอน';
    Swal.fire({
      title: prModel.prNo,
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
            this.feedData();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  gotoNextPage(prMain: PrHeader) {
    this.dataProvider.setScope(prMain);
    this.router.navigate(['/nerubber/actions/', prMain.prNo]);
  }

  backToPrevious() {
    this.location.back();
  }
}
