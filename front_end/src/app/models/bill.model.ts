import { Customer } from './customer.model';
import { Product } from './product.model';

export interface ProductItem {
  id?: number;
  productId: string;
  quantity: number;
  unitPrice: number;
  product?: Product;
}

export interface Bill {
  id?: number;
  billingDate: Date;
  customerId: number;
  productItems: ProductItem[];
  customer?: Customer;
  total?: number;
}
