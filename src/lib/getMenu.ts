import { connectDB } from '@/lib/mongodb';
import Menu from '@/components/Menu'; // Assuming this is your Mongoose model
import { IMenu } from '@/components/Menu';

const menuCache = new Map<string, IMenu | null>();

export async function getMenu(slug: string): Promise<IMenu | null> {
  console.log(`getMenu: Fetching menu with slug: ${slug}`); // Log when getMenu is called

  if (menuCache.has(slug)) {
    console.log(`getMenu: Found in cache - slug: ${slug}`); // Log if found in cache
    return menuCache.get(slug) ?? null;
  }

  console.log(`getMenu: Not in cache - connecting to DB for slug: ${slug}`); // Log before connecting

  try {
    await connectDB();
    console.log(`getMenu: Connected to DB - querying for slug: ${slug}`); // Log after successful connection
    const menu = await Menu.findOne({ slug });
    console.log(`getMenu: Query result for slug '${slug}':`, menu); // Log the query result
    menuCache.set(slug, menu);
    return menu;
  } catch (error) {
    console.error(`getMenu: Error fetching menu for slug '${slug}':`, error); // Log any errors during fetch
    return null;
  }
}