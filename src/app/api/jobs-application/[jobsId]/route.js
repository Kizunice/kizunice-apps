import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req, { params }) {
    console.log(params)
    if (!params.jobsId) {
      return new NextResponse('LearningId is required', { status: 400 });
    }
    const lamaran = await prisma.jobApplication.findUnique({
      where: {
        id: params.jobsId,
      },
      include: {
        student: true,
        job: true,
        partner: true,
      },
    });
  
    return NextResponse.json(lamaran);
  }

export async function DELETE(req,{ params }) {
  console.log(params)

  await prisma.jobApplication.deleteMany({
    where: {
      id: params.jobsId,
    },
  });

  return NextResponse.json({ message: "done" });
}