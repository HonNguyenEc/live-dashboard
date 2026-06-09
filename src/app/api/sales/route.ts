import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { appConfig } from '@/config/app.config';
import type { SalesRecord } from '@/modules/dashboard/types';

// Read the Excel file fresh on each request (data may change on disk).
export const dynamic = 'force-dynamic';

/** Raw row shape as parsed from the sheet (values may be strings or numbers). */
type RawRow = Record<string, string | number | undefined>;

function toNumber(value: string | number | undefined): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const n = Number(value.replace(/,/g, '').trim());
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', appConfig.data.fileName);
    const buffer = await fs.readFile(filePath);

    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[appConfig.data.sheetName];
    if (!sheet) {
      return NextResponse.json(
        { error: `Sheet "${appConfig.data.sheetName}" not found` },
        { status: 500 },
      );
    }

    const rows = XLSX.utils.sheet_to_json<RawRow>(sheet);
    const records: SalesRecord[] = rows.map((row) => ({
      platform: String(row.platform) as SalesRecord['platform'],
      brand: String(row.brand),
      created_date: String(row.created_date),
      hour: String(row.hour),
      gmv: toNumber(row.gmv),
      gross_order: toNumber(row.gross_order),
    }));

    return NextResponse.json(records);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to read Excel file';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
