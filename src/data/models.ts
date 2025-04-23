export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    hasImage: boolean;
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