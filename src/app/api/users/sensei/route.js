import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await prisma.user.findMany({
    where: {
      role: 'SENSEI',
    },
  });

  return NextResponse.json(data);
}
