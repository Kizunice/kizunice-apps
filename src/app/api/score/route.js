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
        createdAt : "desc"
      },
      include : {
        sensei: true,
        learning : true,
        student : true,
      }
    });
    return NextResponse.json(scores);
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
  return NextResponse.json(scores);
  

}

export async function POST(req,res) {
  const body = await req.json();
  const { learningId, studentId,grade, senseiId, bunpou,choukai,kanji,kaiwa,bunka,aisatsu,pushUp,sitUp,barbel, id,  } = body;
  if (id) {
    await prisma.scores.update({
      where : {
        id 
      },
      data: {
        learningId,
        studentId,
        senseiId,
        grade,
        bunpou : parseInt(bunpou),
        choukai : parseInt(choukai),
        kanji : parseInt(kanji),
        kaiwa : parseInt(kaiwa),
        bunka : parseInt(bunka),
        aisatsu : parseInt(aisatsu),
        scoreAvg: parseInt((parseInt(bunpou)+parseInt(choukai)+parseInt(kanji)+parseInt(kaiwa)+parseInt(bunka))/5),
        pushUp : parseInt(pushUp),
        sitUp : parseInt(sitUp),
        barbel : parseInt(barbel),
      }
    })
    return NextResponse.json({ message: "update done" });

  }

  const newScore = await prisma.scores.create({
    data: {
      learningId,
      studentId,
      senseiId,
      grade,
      bunpou : parseInt(bunpou),
      choukai : parseInt(choukai),
      kanji : parseInt(kanji),
      kaiwa : parseInt(kaiwa),
      bunka : parseInt(bunka),
      aisatsu : parseInt(aisatsu),
      scoreAvg: parseInt((parseInt(bunpou)+parseInt(choukai)+parseInt(kanji)+parseInt(kaiwa)+parseInt(bunka))/5),
      pushUp : parseInt(pushUp),
      sitUp : parseInt(sitUp),
      barbel : parseInt(barbel),
    },
  });

  return NextResponse.json(newScore);
}
