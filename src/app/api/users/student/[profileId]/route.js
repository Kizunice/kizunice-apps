import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req,res, {params}) {
  const session = await getCurrentUser(req, res);
  const profileId = params
  console.log(params)
  const data = await prisma.user.findMany({
    where: {
      role: 'STUDENT',
    },
    orderBy : {
      name: "asc"
    }
  });

  return NextResponse.json(data);
}
