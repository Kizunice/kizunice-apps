import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,res,{params}) {
  // const session = getCurrentUser(req,res)
  console.log(params)
  const profile = await prisma.studentProfile.findUnique({
    where: {
      userId: params.profileId,
    },
  });

  return NextResponse.json(profile);
}


export async function DELETE(req,res,{params}) {
  // const session = getCurrentUser(req,res)
  console.log(params)
  // const profile = await prisma.studentProfile.delete({
  //   where: {
  //     userId: params.profileId,
  //   },
  // });

  return NextResponse.json({message : "done"});
}
