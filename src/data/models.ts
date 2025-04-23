export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
}

export interface ICategory {
    name: string;
    description: string;
    products: IProduct[];
}

export interface IMenu {
  name: string;
  categories: ICategory[];
}