import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req, { params }) {
  console.log(params)
  if (!params.id) {
    return new NextResponse('Id is required', { status: 400 });
  }

  const staff = await prisma.staffProfile.findUnique({
    where: {
      id : params.id,
    },
  });

  if (!staff) {
    const sensei = await prisma.senseiProfile.findUnique({
      where: {
        id : params.id,
      },
    });
    return NextResponse.json(sensei);
  }
  return NextResponse.json(staff);
}
