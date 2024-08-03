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
