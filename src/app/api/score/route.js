import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req, res) {
  const session = await getCurrentUser(req, res);

  const scores = await prisma.scores.findMany({
    orderBy: {
      createdAt : "desc"
    }
  });

  return NextResponse.json(scores);
}

export async function POST(req) {
  const body = await req.json();
  const { learningId, studentId, senseiId, bunpou,choukai,kanji,kaiwa,bunka,aisatsu,pushUp,sitUp,barbel } = body;

  const newScore = await prisma.scores.create({
    data: {
        learningId,
        studentId,
        senseiId,
        bunpou : parseInt(bunpou),
        choukai : parseInt(choukai),
        kanji : parseInt(kanji),
        kaiwa : parseInt(kaiwa),
        bunka : parseInt(bunka),
        aisatsu : parseInt(aisatsu),
        pushUp : parseInt(pushUp),
        sitUp : parseInt(sitUp),
        barbel : parseInt(barbel),
    },
  });

  return NextResponse.json(newScore);
}
