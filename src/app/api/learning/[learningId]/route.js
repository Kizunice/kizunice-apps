import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  console.log(params)
  if (!params.learningId) {
    return new NextResponse('LearningId is required', { status: 400 });
  }
  const learning = await prisma.learning.findUnique({
    where: {
      id: params.learningId,
    },
    include: {
      students: true,
      sensei: true,
      scores: {
        include : {
          student : true
        }
      },
    },
  });

  return NextResponse.json(learning);
}


export async function DELETE(req,{ params }) {
  console.log(params)
  await prisma.scores.deleteMany({
    where: {
      learningId: params.learningId,
    },
  });

  await prisma.learning.delete({
    where: {
      id: params.learningId,
    },
  });

  return NextResponse.json({ message: "done" });
}