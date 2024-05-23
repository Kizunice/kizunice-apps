import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  if (!params.learningId) {
    return new NextResponse('LearningId is required', { status: 400 });
  }
  const learning = await prisma.learning.findUnique({
    where: {
      id: params.learningId,
    },
  });

  return NextResponse.json(learning);
}
