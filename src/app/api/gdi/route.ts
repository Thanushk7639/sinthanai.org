import { NextRequest, NextResponse } from 'next/server';

const GDI_BASE_URL = process.env.GDI_BASE_URL || 'http://localhost:8787';
const DRIVE_INDEX = process.env.GDI_DRIVE_INDEX || '0';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, path, q, id } = body as {
      action: 'list' | 'search' | 'id2path';
      path?: string;
      q?: string;
      id?: string;
    };

    if (action === 'list') {
      const folderPath = path || '/';
      const segments = folderPath.split('/').filter(Boolean);
      const encodedPath = segments.map((s) => encodeURIComponent(s)).join('/');
      const gdiUrl = `${GDI_BASE_URL}/${DRIVE_INDEX}:/${encodedPath}${encodedPath ? '/' : ''}`;
      const res = await fetch(gdiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: '',
          type: 'folder',
          password: '',
          page_token: '',
          page_index: 0,
        }),
      });
      const data = await res.json();
      return NextResponse.json(data);
    }

    if (action === 'search') {
      const gdiUrl = `${GDI_BASE_URL}/${DRIVE_INDEX}:search`;
      const res = await fetch(gdiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: q || '', page_token: null, page_index: 0 }),
      });
      const data = await res.json();
      return NextResponse.json(data);
    }

    if (action === 'id2path') {
      const gdiUrl = `${GDI_BASE_URL}/${DRIVE_INDEX}:id2path`;
      const res = await fetch(gdiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id || '' }),
      });
      const data = await res.json();
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch from GDI' },
      { status: 500 }
    );
  }
}