import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductResponse } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/Services/network.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css'],
})
export class StockHomeComponent implements OnInit {
  displayedColumn: string[] = ['image', 'name', 'price', 'stock', 'action'];
  dataSource = new MatTableDataSource<ProductResponse>();

  textSearch: string = '';

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  //@ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private networkService: NetworkService) {}

  ngOnInit(): void {
    //this.dataSource.sort = this.sort;
    this.feedData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
    this.networkService.getProducts().subscribe(
      (data) => {
        //alert(JSON.stringify(data[1].name));
        this.dataSource = new MatTableDataSource(
          data.map((item) => {
            item.image = this.networkService.getProductImages(item.image);
            return item;
          })
        );
      },
      (error) => {
        alert(JSON.stringify(error.error.messsage));
      },
      () => {
        console.log('Feed product success');
      }
    );
  }

  onDeleteProduct(product: ProductResponse) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'ลบข้อมูลสินค้า ' + product.name + '!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบข้อมูล',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.networkService.deleteProduct(product.id.toString()).subscribe(
          (data) => {
            this.feedData();
          },
          (error) => {
            console.log(error.error.message);
          }
        );
      }
    });
  }
}
