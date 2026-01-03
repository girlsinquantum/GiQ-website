import { NextResponse } from 'next/server';
import { harvestAndCache } from '@/lib/harvester';

export async function GET(req: Request) {
  // Security: Check for a secret key so random people don't spam API quota
  const { searchParams } = new URL(req.url);
  if (searchParams.get('key') !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await harvestAndCache();
  
  return NextResponse.json({ 
    message: 'Harvest complete', 
    added: result.count 
  });
}