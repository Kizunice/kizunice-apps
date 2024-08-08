import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req, { params }) {
  console.log(params)
  if (!params.partnerId) {
    return new NextResponse('LearningId is required', { status: 400 });
  }
  const profile = await prisma.partnerProfile.findUnique({
    where: {
      id : params.partnerId,
    },
    include:{
        company: true,
    }
  });

  return NextResponse.json(profile);
}


export async function POST(req) {
  const body = await req.json();
  const {name,address,phone,supervisorId} =body

  const company = await prisma.companies.create({
    data: {
      name,
      address,
      phone,
      supervisorId
    },
  });

  return NextResponse.json(company);
}

export async function DELETE(req,{ params }) {
  console.log(params)
  await prisma.companies.delete({
    where: {
      id: params.partnerId,
    },
  });
  return NextResponse.json({ message: "done" });
}