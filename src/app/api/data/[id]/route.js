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


export async function POST(req, res, { params }) {
  const session = await getCurrentUser(req, res);

  if (!params.id) {
    return new NextResponse('Id is required', { status: 400 });
  }
  const body = await req.json();
  const {
    userId,
    accStatus
  } = body;

  const user = await prisma.user.findUnique({
    where: {
      id : session.id
    },
  });

  if (user.role !== "ADMIN" || user.role !== "MASTER" ) {
    return new NextResponse('Higher role required', { status: 400 });
  }

  const status = await prisma.user.update({
    where: {
      id : userId
    },
    data: {
      accStatus
    },
  });

  return NextResponse.json({message : "done", status});

  // if(user.role === "SENSEI") {
  //  const status = await prisma.senseiProfile.update({
  //     where: {
  //       userId: user.id,
  //     },
  //     data: {
  //       accStatus
  //     },
  //   });
  //   return NextResponse.json(status);
  // } else if(user.role === "DOCUMENT" || "FINANCE") {
  //   const status = await prisma.staffProfile.update({
  //     where: {
  //       userId: user.id,
  //     },
  //     data: {
  //       accStatus
  //     },
  //   });
  //   return NextResponse.json(status);
  // }
}
