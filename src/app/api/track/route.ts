import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SiteVisit from '@/models/SiteVisit';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    
    await SiteVisit.create({
      ip: body.ip || 'Unknown',
      country: body.country || 'Unknown',
      region: body.region || 'Unknown',
      city: body.city || 'Unknown',
      userAgent: body.userAgent || 'Unknown',
      device: body.device || 'desktop',
      os: body.os || 'Unknown',
      referrer: body.referrer || 'Direct',
      isBot: body.isBot || false,
      path: body.path || '/',
      eventName: body.eventName
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
