import fs from 'fs';
import path from 'path';
import { IMenu } from '@/components/Menu';

export async function getMenu(id: string): Promise<IMenu | null> {
  if (!id || typeof id !== 'string') {
    console.error(`Invalid id provided`);
    return null;
  }

  try {
    const filePath = path.join(process.cwd(), 'data', id, 'menu.json');
    
    if (!fs.existsSync(filePath)) {
      console.error(`Menu file not found for id: ${id} at path: ${filePath}`);
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const menu: IMenu = JSON.parse(fileContent);

    return menu;
  } catch (error) {
    console.error(`Error loading menu for id: ${id}`, error);
    return null;
  }
}
