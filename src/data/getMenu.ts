import { IMenu } from '@/components/Menu';
import fs from 'fs';
import path from 'path';

export async function getMenuData(id: string) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', id, 'menu.json');

    if (!fs.existsSync(filePath)) {
      console.error(`Menu file not found for id: ${id}, at path: ${filePath}`);
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
