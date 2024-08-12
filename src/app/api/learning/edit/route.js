import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function POST(req) {
  const body = await req.json();
  const { title, description, part, date, senseiId, senseiName, id } = body;

  const newDate = new Date(date);

  const newLearning = await prisma.learning.update({
    where : {
      id
    },
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
