import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  console.log(params)
  const user = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  return NextResponse.json(user);
}
