export async function getMenuData(id: string, useBase: boolean = true) {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  let filePath = `/data/${id}/menu.json`;
  if (useBase) {
    filePath = baseUrl + filePath;
  }

  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      console.error(`Failed to fetch menu data for id: ${id}, status: ${response.status}, filePath: ${filePath}`);
      return null;
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(`Error fetching menu data for id: ${id}, at path: ${filePath}`, error);
    return null;
  }
}