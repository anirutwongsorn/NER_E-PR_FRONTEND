import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/Services/network.service';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css'],
})
export class StockCreateComponent implements OnInit {
  imageSrc!: string | ArrayBuffer;
  file!: File;

  constructor(private networkService: NetworkService, private loc: Location) {}

  ngOnInit(): void {}

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

    this.networkService.addProduct(product).subscribe(
      (data) => {
        this.loc.back();
      },
      (error) => {
        console.log(error.error.message);
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
