import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PrCancelBody } from 'src/app/models/ner/pr_cancel';
import { PrHeader } from 'src/app/models/ner/pr_header';
import { DataProviderService } from 'src/app/Services/data-provider.service';
import { NerReportService } from 'src/app/Services/ner-report.service';
import { NerService } from 'src/app/Services/ner.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pur-pr-dashboard',
  templateUrl: './pur-pr-dashboard.component.html',
  styleUrls: ['./pur-pr-dashboard.component.css'],
})
export class PurPrDashboardComponent implements OnInit {
  currentItem = 'Anirut Wongsorn';
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
    'isAckn',
    'action',
  ];

  /*name of the excel-file which will be downloaded. */
  fileName = 'all_prPending.xlsx';

  sumPending: number = 0;
  sumChecked: number = 0;
  sumApproved: number = 0;
  sumCompleted: number = 0;

  dataSource = new MatTableDataSource<PrHeader>();

  textSearch: string = '';

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  constructor(
    private nerService: NerService,
    private dataProvider: DataProviderService,
    private router: Router,
    private nerRptService: NerReportService
  ) {}

  ngOnInit(): void {
    this.feedData();
    this.getOverAllStatus();
  }

  search(event: any = null) {
    let filterVal = '';
    if (event) {
      filterVal = (event.target as HTMLInputElement).value;
    }
    this.dataSource.filter = filterVal.trim().toLowerCase();
  }

  clearSearch() {
    this.textSearch = '';
    this.search();
    console.log(this.search);
  }

  feedData() {
    //this.loadingService.showSpinner();
    this.nerService.getPurchasingByStatus('checked').subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(
          data.map((item) => {
            if (item.isAckn) {
              item.iconName = 'done_all';
            }
            return item;
          })
        );
        this.dataSource.paginator = this.paginator!;
      },
      (error) => {
        //alert(JSON.stringify(error.error.messsage));
        console.log(JSON.stringify(error));
      },
      () => {
        console.log('Feed product success');
      }
    );
  }

  cancelPr(prModel: PrHeader) {
    let cancelModel = new PrCancelBody();
    cancelModel.prNo = prModel.prNo;
    cancelModel.oldStatus = prModel.status;
    cancelModel.newStatus = 'canceled';
    cancelModel.operationName = 'ฝ่ายจัดซื้อ';
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

  getOverAllStatus() {
    this.nerRptService.getPrOverAllSummary('PR64').subscribe((data) => {
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

  gotoNextPage(prMain: PrHeader) {
    this.dataProvider.setScope(prMain);
    this.router.navigate(['/nerubber/actions/', prMain.prNo]);
  }

  exportexcel() {
    /* table id is passed over here */
    let element = document.getElementById('allprPending');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'NER_All_PrPending');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
