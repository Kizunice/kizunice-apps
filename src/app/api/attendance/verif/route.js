import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function POST(req) {
  const body = await req.json();

  await prisma.attendance.update({
    where: {
      id: body,
    },
    data: {
      accepted: true,
    //   acceptedDate: new Date(),
    },
  });

  return NextResponse.json({
    status: 'success',
  });
}
