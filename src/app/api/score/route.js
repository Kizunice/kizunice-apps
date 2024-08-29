import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { data } from 'autoprefixer';

export async function GET(req, res) {
  const session = await getCurrentUser(req, res);
  if (!session) {
    return new NextResponse('Error! Need Authentication!', { status: 400 });
  }
  if(session.role === "SENSEI") {
  
    const profile = await prisma.senseiProfile.findUnique({
      where : {
        userId : session.id
      }
    })

    if(profile.status === "NONACTIVE") {
      return new NextResponse('Akunmu sudah tidak aktif', { status: 400 });
    }

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
  } else if (session.role === "STUDENT") {
    const profile = await prisma.studentProfile.findUnique({
      where : {
        userId : session.id
      }
    })
    
    const scores = await prisma.scores.findMany({
      where : {
        studentId : profile.id
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
  const session = await getCurrentUser(req, res);
  const body = await req.json();
  const {scoreId, learningId, studentId,grade,linkFile, senseiId, bunpou,choukai,kanji,kaiwa,bunka,aisatsu,pushUp,sitUp,barbel } = body;
  
  const profile = await prisma.senseiProfile.findUnique({
    where : {
      userId : session.id
    }
  })

  if(profile.status === "NONACTIVE") {
    return new NextResponse('Akunmu sudah tidak aktif', { status: 400 });
  }

  let avereage 

  if (bunpou && choukai && kanji) {
    avereage = parseInt((parseInt(bunpou)+parseInt(choukai)+parseInt(kanji))/3)
  } else if (bunpou && choukai) {
    avereage = parseInt((parseInt(bunpou)+parseInt(choukai))/2)
  } else if (bunpou && kanji) {
    avereage = parseInt((parseInt(bunpou)+parseInt(kanji))/2)
  } else if (choukai && kanji) {
    avereage = parseInt((parseInt(choukai)+parseInt(kanji))/2)
  } else if (bunpou) {
    avereage = parseInt(bunpou)
  } else if (choukai) {
    avereage = parseInt(choukai)
  } else if (kanji) {
    avereage = parseInt(kanji)
  }

  const score = await prisma.scores.upsert({
      where : {
        id : scoreId || '',
      },
      update: {
        grade,
        linkFile,
        bunpou : parseInt(bunpou) || 0,
        choukai : parseInt(choukai) || 0,
        kanji : parseInt(kanji) || 0,
        kaiwa : kaiwa || null,
        bunka : bunka || null,
        aisatsu : aisatsu || null,
        scoreAvg: avereage,
        pushUp : parseInt(pushUp) | 0,
        sitUp : parseInt(sitUp) | 0,
        barbel : parseInt(barbel) | 0,
      },
      create: {
        learningId,
        studentId,
        senseiId,
        grade,
        linkFile,
        bunpou : parseInt(bunpou) || 0,
        choukai : parseInt(choukai) || 0,
        kanji : parseInt(kanji) || 0,
        kaiwa : kaiwa || null,
        bunka : bunka || null,
        aisatsu : aisatsu || null,
        scoreAvg: avereage,
        pushUp : parseInt(pushUp) | 0,
        sitUp : parseInt(sitUp) | 0,
        barbel : parseInt(barbel) | 0,
      },
    })

  return NextResponse.json(score);
}
