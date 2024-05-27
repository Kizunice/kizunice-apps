import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,res,{params}) {
  // const session = getCurrentUser(req,res)
  console.log(params)
  // if (!params.profileId) {
  //   return new NextResponse('ProfileId is required', { status: 400 });
  // }
  const profile = await prisma.studentProfile.findUnique({
    where: {
      userId: params.profileId,
    },
  });

  return NextResponse.json(profile);
}
