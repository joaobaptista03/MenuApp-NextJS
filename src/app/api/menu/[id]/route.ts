import { NextResponse } from 'next/server';
import { getMenuData } from '@/data/getMenu';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const menu = await getMenuData(id);

  if (!menu) {
    return NextResponse.json({ error: 'Menu not found' }, { status: 404 });
  }

  return NextResponse.json(menu);
}