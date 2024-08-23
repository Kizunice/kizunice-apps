import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { data } from 'autoprefixer';

export async function GET(req, res) {
  const session = await getCurrentUser(req, res);

  if(session.role === "SENSEI") {
    const profile = await prisma.senseiProfile.findUnique({
      where : {
        userId : session.id
      }
    })
    
    const scores = await prisma.scores.findMany({
      where : {
        senseiId : profile.id
      },
      orderBy: {
        scoreAvg : "desc"
      },
      include : {
        sensei: true,
        learning : true,
        student : true,
      }
    });

    const gradeA = scores.filter((data) => data.grade === "A")
    const gradeB = scores.filter((data) => data.grade === "B")
    const gradeC = scores.filter((data) => data.grade === "C")
    const gradeD = scores.filter((data) => data.grade === "D")
    const gradeE = scores.filter((data) => data.grade === "E")

    return NextResponse.json({
      scores,
      gradeA,
      gradeB,
      gradeC,
      gradeD,
      gradeE
    });
  }

  const scores = await prisma.scores.findMany({
    orderBy: {
      scoreAvg : "desc"
    },
    include : {
      sensei: true,
      learning : true,
      student : true,
    }
  });

  const gradeA = scores.filter((data) => data.grade === "A")
  const gradeB = scores.filter((data) => data.grade === "B")
  const gradeC = scores.filter((data) => data.grade === "C")
  const gradeD = scores.filter((data) => data.grade === "D")
  const gradeE = scores.filter((data) => data.grade === "E")

  return NextResponse.json({
    scores,
    gradeA,
    gradeB,
    gradeC,
    gradeD,
    gradeE
  });
}

export async function POST(req,res) {
  const body = await req.json();
  const {scoreId, learningId, studentId,grade,linkFile, senseiId, bunpou,choukai,kanji,kaiwa,bunka,aisatsu,pushUp,sitUp,barbel } = body;

  const score=   await prisma.scores.upsert({
      where : {
        id : scoreId || '',
      },
      update: {
        grade,
        linkFile,
        bunpou : parseInt(bunpou),
        choukai : parseInt(choukai),
        kanji : parseInt(kanji),
        kaiwa ,
        bunka ,
        aisatsu,
        scoreAvg: parseInt((parseInt(bunpou)+parseInt(choukai)+parseInt(kanji))/3),
        pushUp : parseInt(pushUp) | '',
        sitUp : parseInt(sitUp) | '',
        barbel : parseInt(barbel) | '',
      },
      create: {
        learningId,
        studentId,
        senseiId,
        grade,
        linkFile,
        bunpou : parseInt(bunpou),
        choukai : parseInt(choukai),
        kanji : parseInt(kanji),
        kaiwa ,
        bunka ,
        aisatsu,
        scoreAvg: parseInt((parseInt(bunpou)+parseInt(choukai)+parseInt(kanji))/3),
        pushUp : parseInt(pushUp) | '',
        sitUp : parseInt(sitUp) | '',
        barbel : parseInt(barbel) | '',
      },
    })

  return NextResponse.json(score);
}
