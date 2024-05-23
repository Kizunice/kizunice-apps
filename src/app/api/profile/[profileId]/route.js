import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req, { params }) {
  const id = params.profileId;
  const profile = await prisma.studentProfile.findUnique({
    where: {
      userId: id,
    },
  });

  return NextResponse.json(profile);
}
