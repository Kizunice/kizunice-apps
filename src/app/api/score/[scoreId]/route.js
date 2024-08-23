import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req, { params }) {
    if (!params.scoreId) {
      return new NextResponse('LearningId is required', { status: 400 });
    }
    const nilai = await prisma.scores.findUnique({
      where: {
        id: params.scoreId,
      },
      include : {
        sensei: true,
        learning : true,
        student : true,
      }
    });
  
    return NextResponse.json(nilai);
  }

  
export async function DELETE(req,{ params }) {
  console.log(params)

  await prisma.scores.deleteMany({
    where: {
      id: params.scoreId,
    },
  });

  return NextResponse.json({ message: "done" });
}