import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/Services/network.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css'],
})
export class StockEditComponent implements OnInit {
  imageSrc!: string | ArrayBuffer;

  @ViewChild('productForm', { static: true }) productForm!: NgForm;

  file!: File;

  constructor(
    private activateRoute: ActivatedRoute,
    private networkService: NetworkService,
    private loc: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      console.log(params.id);
      this.feedData(params.id);
    });
  }

  feedData(id: number) {
    this.networkService.getProduct(id).subscribe(
      (data) => {
        //alert(JSON.stringify(data));
        var { id, name, price, stock, image } = { ...data };
        this.imageSrc = this.networkService.getProductImages(image);
        this.productForm.setValue({ id, name, price, stock });
      },
      (error) => {
        JSON.stringify(error.error.message);
      }
    );
  }

  onSubmit(productForm: NgForm) {
    if (productForm.invalid) {
      return;
    }
    const val = productForm.value;
    var product = new Product();
    product.name = val.name;
    product.price = val.price;
    product.stock = val.stock;
    product.images = this.file;

    this.networkService.editProduct(val.id, product).subscribe(
      (_) => {
        this.loc.back();
      },
      (error) => {
        console.log(error.error.message);
        this.router.navigate(['/stock']);
      }
    );
  }

  onPreviewImage(event: any) {
    //lert('aaaaa');
    const metaImage = event.target.files[0];
    if (metaImage) {
      this.file = metaImage;
      const reader = new FileReader();
      reader.readAsDataURL(metaImage);
      reader.onloadend = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }
}
