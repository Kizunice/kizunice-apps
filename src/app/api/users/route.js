import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET() {
  const data = await prisma.user.findMany({
    orderBy : {
      name : "asc"
    }
  });

  return NextResponse.json(data);
}


export async function POST(req, res) {
  const body = await req.json();
  const session = await getCurrentUser(req, res);

  const { url } = body;

  const avatar = await prisma.user.update({
    where:{
      id: session.id
    },
    data: {
      image: url
    },
  });

  return NextResponse.json({
    status: 'success',
    data: { avatar },
  });
}
