import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';


export async function GET(req, res) {
  const session = await getCurrentUser(req, res);

  if(session.role === "SENSEI") {
    const learning = await prisma.learning.findMany({
      where: {
        senseiId: session.id,
      },
    }); 
    return NextResponse.json(learning);
  }

  const learning = await prisma.learning.findMany({
    include: {
      students: true,
      scores: true,
    },
  });

  return NextResponse.json(learning);
}

export async function POST(req) {
  const body = await req.json();
  const { title, description, part, date, senseiId, senseiName } = body;

  const newDate = new Date(date);

  const newLearning = await prisma.learning.create({
    data: {
      title: title,
      description: description,
      part: part,
      date: newDate.toISOString(),
      senseiId: senseiId,
      senseiName: senseiName,
      fileUrl: '',
    },
  });

  return NextResponse.json(newLearning);
}
