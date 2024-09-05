import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

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

    const learning = await prisma.learning.findMany({
      where: {
        sensei: {
          userId : session.id
        }
      },
      include: {
        students: true,
        sensei : true,
        scores: {
          include : {
            student : true
          }
        },
      },
      orderBy: {
        createdAt : "desc"
      }
    }); 
    return NextResponse.json(learning);
  } 

  if(session.role === "STUDENT") {
    const learning = await prisma.learning.findMany({
      where: {
        students: {
          some : {
            userId : session.id
          }
        }
      },
      include: {
        students: true,
        sensei : true,
        scores: {
          include : {
            student : true
          }
        },
      },
      orderBy: {
        createdAt : "desc"
      }
    }); 
    return NextResponse.json(learning);
  } 

  const learning = await prisma.learning.findMany({
    include: {
      students: true,
      sensei : true,
      scores: {
        include : {
          student : true
        }
      },
    },
    orderBy: {
      createdAt : "desc"
    }
  });

  return NextResponse.json(learning);
}

export async function POST(req,res) {
  const session = await getCurrentUser(req, res);
  const body = await req.json();
  const { title, description, part, date, senseiId, students, fileUrl} = body;

  const newDate = new Date(date);
  
  let studentData = []
    students.map(id => {
        studentData.push({id})
  })

  const profile = await prisma.senseiProfile.findUnique({
    where : {
      userId : session.id
    }
  })
  
  if(profile.status === "NONACTIVE") {
    return new NextResponse('Akunmu sudah tidak aktif', { status: 400 });
  }

  const learning = await prisma.learning.create({
    data: {
      title: title,
      description: description,
      part: parseInt(part),
      date: newDate.toISOString(),
      senseiId: senseiId,
      students : {
        connect : studentData
      },
      fileUrl: fileUrl ,
    },
  });

  // let scoreGrade
  // if (part <= 10) {
  //   scoreGrade = 'E'
  // } else if (part <= 20) {
  //   scoreGrade = 'D'
  // } else if (part <= 30) {
  //   scoreGrade = 'C'
  // } else if (part <= 40) {
  //   scoreGrade = 'B'
  // } else if (part <= 50) {
  //   scoreGrade = 'A'
  // }
 
  // let scoreData = []
  // students.map(id => {
  //   scoreData.push({
  //     learningId : learning.id,
  //     studentId : id,
  //     senseiId : senseiId,
  //     grade : scoreGrade,
  //     linkFile : null,
  //     bunpou : 0,
  //     choukai : 0,
  //     kanji : 0,
  //     kaiwa : null,
  //     bunka : null,
  //     aisatsu : null,
  //     scoreAvg: 0,
  //     pushUp : 0,
  //     sitUp : 0,
  //     barbel : 0,
  //   })
  // })

  // await prisma.scores.createMany({
  //   data : scoreData
  // })

  return NextResponse.json(learning);
}
