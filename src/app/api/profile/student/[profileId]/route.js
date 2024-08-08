import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,res,{params}) {
  // const session = getCurrentUser(req,res)
  console.log("cek params server:", params)
  const profile = await prisma.studentProfile.findUnique({
    where: {
      userId: params.profileId,
    },
  });

  return NextResponse.json(profile);
}
