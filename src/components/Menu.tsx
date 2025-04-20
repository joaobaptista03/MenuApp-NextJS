import mongoose, { Schema, Document } from 'mongoose';
import { ICategory, CategorySchema } from './Category';

export interface IMenu extends Document {
  slug: string;
  name: string;
  categories: ICategory[];
}

export const MenuSchema: Schema = new Schema<IMenu>({
  slug: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  categories: [CategorySchema],
});

export default mongoose.models.Menu || mongoose.model<IMenu>('Menu', MenuSchema);