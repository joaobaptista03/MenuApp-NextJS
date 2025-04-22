import fs from 'fs/promises';
import path from 'path';

export async function getMenuData(id: string) {
  const filePath = path.join(process.cwd(), 'public', 'data', id, 'menu.json');
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error reading menu file for id: ${id}, at path: ${filePath}`, error);
    return null;
  }
}
