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
      signOut: true,
      signOutTime: new Date(),
    },
  });

  return NextResponse.json({
    status: 'success',
    data: { signOut: true, signOutTime: new Date() },
  });
}
