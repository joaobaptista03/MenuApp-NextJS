import { IProduct } from './Product';

export interface ICategory extends Document {
  name: string;
  description: string;
  products: IProduct[];
}