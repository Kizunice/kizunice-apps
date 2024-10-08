import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  console.log(params.jobsId)
  if (!params.jobsId) {
    return new NextResponse('LearningId is required', { status: 400 });
  }
  const jobs = await prisma.jobOpportunity.findUnique({
    where: {
      id: params.jobsId,
    },
    include: {
      company: true,
      supervisor: true,
      applications: {
        include: {
          student : true,
        }
      },
    },
  });

  return NextResponse.json(jobs);
}

export async function DELETE(req,{ params }) {
  console.log(params)

  await prisma.jobApplication.deleteMany({
    where: {
      jobId: params.jobsId,
    },
  });

  await prisma.jobOpportunity.delete({
    where: {
      id: params.jobsId,
    },
  });

  return NextResponse.json({ message: "done" });
}
