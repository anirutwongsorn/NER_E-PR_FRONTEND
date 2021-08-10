export class Product {
  name!: string;
  stock!: number;
  price!: number;
  images!: any;
}

export interface ProductResponse {
  id: number;
  name: string;
  image: string;
  stock: number;
  price: number;
  created_at: Date;
  updated_at: Date;
}
