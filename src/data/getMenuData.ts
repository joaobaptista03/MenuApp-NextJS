export async function getMenuData(id: string) {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const filePath = `${baseUrl}/data/${id}/menu.json`;
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      console.error(`Failed to fetch menu data for id: ${id}, status: ${response.status}`);
      return null;
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(`Error fetching menu data for id: ${id}, at path: ${filePath}`, error);
    return null;
  }
}