import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req, res) {
  const session = await getCurrentUser(req, res);
  if(session.role === "SENSEI") {
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
  const body = await req.json();
  const { title, description, part, date, senseiId, students } = body;

  const newDate = new Date(date);
  
  let studentData = []
    students.map(id => {
        studentData.push({id})
  })

  const newLearning = await prisma.learning.create({
    data: {
      title: title,
      description: description,
      part: part,
      date: newDate.toISOString(),
      senseiId: senseiId,
      students : {
        connect : studentData
      },
      fileUrl: '',
    },
  });

  return NextResponse.json(newLearning);
}
