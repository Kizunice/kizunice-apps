import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,res) {
  const session = await getCurrentUser(req,res)
  const profile = await prisma.studentProfile.findUnique({
    where: {
      userId: session.id,
    },
  });

  return NextResponse.json(profile);
}
