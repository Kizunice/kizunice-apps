import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,{params}) {
  console.log(params)
  const profile = await prisma.studentProfile.findUnique({
    where: {
      id: params.profileId,
    },
  });

  return NextResponse.json(profile);
}
