import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const learning = await prisma.learning.findMany();

  //return response JSON
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
