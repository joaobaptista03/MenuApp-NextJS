import { NextRequest, NextResponse } from 'next/server';

const counter: Record<string, number> = {};

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  if (!counter[id]) {
    counter[id] = 0;
  }

  counter[id] += 1;

  return NextResponse.json({ visits: counter[id] });
}
