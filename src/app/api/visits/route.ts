import { getMenuData } from '@/data/getMenuData';
import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale } from '@/constants';

const counter: Record<string, number> = {};
let lastResetDate: string | null = null;

function resetCountersIfNeeded() {
  const currentDate = new Date().toISOString().split('T')[0];

  if (lastResetDate !== currentDate) {
    Object.keys(counter).forEach(id => {
      counter[id] = 0;
    });
    lastResetDate = currentDate;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  if (await getMenuData(id, defaultLocale) == null) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 404 });
  }

  resetCountersIfNeeded();

  if (!counter[id]) {
    counter[id] = 0;
  }

  counter[id] += 1;

  return NextResponse.json({ visits: counter[id] });
}
