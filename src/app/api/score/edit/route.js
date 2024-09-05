import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { avgCalc, gradeCalc } from '@/lib/utils';

export async function POST(req,res) {
    const session = await getCurrentUser(req, res);
    const body = await req.json();
    
    const profile = await prisma.senseiProfile.findUnique({
      where : {
        userId : session.id
      }
    })
  
    if(profile.status === "NONACTIVE") {
      return new NextResponse('Akunmu sudah tidak aktif', { status: 400 });
    }

    let scoreData = []
    body.map(val => {
        const average = avgCalc(val)
        const grade = gradeCalc(val.grade)
        scoreData.push({
            learningId : val.learningId,
            studentId : val.studentId,
            senseiId : val.senseiId,
            grade : grade,
            linkFile : val.linkFile,
            bunpou : parseInt(val.bunpou) || 0,
            choukai : parseInt(val.choukai) || 0,
            kanji : parseInt(val.kanji) || 0,
            kaiwa : val.kaiwa || null,
            bunka : val.bunka || null,
            aisatsu : val.aisatsu || null,
            scoreAvg: average,
            pushUp : parseInt(val.pushUp) || 0,
            sitUp : parseInt(val.sitUp) || 0,
            barbel : parseInt(val.barbel) || 0,
        })
    })

    console.log("score", scoreData)
    
    await prisma.scores.createMany({
        data : scoreData
    })
    
    return NextResponse.json("done");
  }
  