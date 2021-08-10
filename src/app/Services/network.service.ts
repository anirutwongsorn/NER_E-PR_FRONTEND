import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductResponse } from '../models/product.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(private httpClient: HttpClient) {}

  finalPath: string = environment.baseUrl;

  getProducts(): Observable<ProductResponse[]> {
    return this.httpClient
      .get<ProductResponse[]>('product')
      .pipe(map((result: any) => result.product));
  }

  getProduct(id: number): Observable<ProductResponse> {
    return this.httpClient
      .get<ProductResponse>('product/' + id)
      .pipe(map((result: any) => result.product));
  }

  getProductImages(image: string): string {
    if (image) {
      return this.finalPath + 'images/' + image;
    }
    return 'assets/images/no_image.jpg';
  }

  addProduct(product: Product): Observable<any> {
    return this.httpClient.post<any>('product', this.makeFormData(product), {
      reportProgress: true,
    });
  }

  editProduct(id: number, product: Product): Observable<any> {
    return this.httpClient.put<any>(
      'product/' + id,
      this.makeFormData(product),
      { reportProgress: true }
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.httpClient.delete<any>('product/' + id);
  }

  makeFormData(product: Product): FormData {
    var frmData = new FormData();
    frmData.append('name', product.name);
    frmData.append('price', product.price.toString());
    frmData.append('stock', product.stock.toString());
    frmData.append('photo', product.images);
    return frmData;
  }

}
