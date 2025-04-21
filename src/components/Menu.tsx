import mongoose, { Schema, Document } from 'mongoose';
import { ICategory, CategorySchema } from './Category';

export interface IMenu extends Document {
  name: string;
  categories: ICategory[];
}

export const MenuSchema: Schema = new Schema<IMenu>({
  name: { type: String, required: true },
  categories: [CategorySchema],
});

export default mongoose.models.Menu || mongoose.model<IMenu>('Menu', MenuSchema);