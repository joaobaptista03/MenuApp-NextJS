import { ICategory } from "./Category";

export interface IMenu {
  name: string;
  categories: ICategory[];
}