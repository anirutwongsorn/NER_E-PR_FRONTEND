import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PrWorkorder } from 'src/app/models/ner/pr_workorder';
import { NerService } from 'src/app/Services/ner.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pr-pending-item',
  templateUrl: './pr-pending-item.component.html',
  styleUrls: ['./pr-pending-item.component.css'],
})
export class PrPendingItemComponent implements OnInit {
  displayedColumn: string[] = [
    'prNo',
    'prType',
    'fullName',
    'dateCreated',
    'timeCreated',
    'deptSymbol',
    'division',
    'remark',
    'approveName',
    'approveDate',
    'approveTime',
    'pdCode',
    'pdDetail',
    'qty',
    'keeping',
    'bdgCode',
    'objective',
    'po',
    'poDate'
  ];

  textSearch: string = '';

  fileName = 'all_prPendingItem.xlsx';

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  dataSource = new MatTableDataSource<PrWorkorder>();

  constructor(private nerService: NerService) {}

  ngOnInit(): void {
    this.getPrItem();
  }

  getPrItem() {
    this.nerService
      .getPurchaseRequestItemByStatus('checked')
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator!;
      });
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

  exportexcel() {
    /* table id is passed over here */
    let element = document.getElementById('allprPendingitem');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'NER_All_PrPendingItem');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
