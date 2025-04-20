import { connectDB } from '@/lib/mongodb';
import Menu from '@/components/Menu';
import { IMenu } from '@/components/Menu';

const menuCache = new Map<string, IMenu | null>();

export async function getMenu(slug: string): Promise<IMenu | null> {
  if (menuCache.has(slug)) {
    return menuCache.get(slug) ?? null;
  }

  await connectDB();
  const menu = await Menu.findOne({ slug });
  menuCache.set(slug, menu);
  return menu;
}
