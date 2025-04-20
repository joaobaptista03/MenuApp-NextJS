import mongoose, { Schema, Document } from 'mongoose';
import { IProduct, ProductSchema } from './Product';

export interface ICategory extends Document {
  name: string;
  description: string;
  products: IProduct[];
}

export const CategorySchema: Schema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  products: [ProductSchema],
});

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);