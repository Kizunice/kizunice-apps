import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req, res) {
  const session = await getCurrentUser(req, res);

  if (!session) {
    return new NextResponse('Error! Need Authentication!', { status: 400 });
  }

  if (session.role === 'ADMIN' || session.role === 'MASTER') {
    const allAttendance = await prisma.attendance.findMany({
      where : {
        accepted : true
      },
      orderBy: {
        createdAt: 'desc',
      },
      include :{
        sensei :true,
        student : true
      }
    });
    return NextResponse.json(allAttendance);
  } else if (session.role === "SENSEI") {
    const profile = await prisma.senseiProfile.findUnique({
      where: {
        userId : session.id
      }
    })
    const attendance = await prisma.attendance.findMany({
      where: {
        senseiId: profile.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include :{
        sensei :true,
        student : true
      }
    });
  
    return NextResponse.json(attendance);
  }

  const profile = await prisma.studentProfile.findUnique({
    where: {
      userId : session.id
    }
  })

  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: profile.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include :{
      sensei :true,
      student : true
    }
  });

  return NextResponse.json(attendance);
}

export async function POST(req, res) {
  const body = await req.json();
  const session = await getCurrentUser(req, res);

  const { senseiId, name, signIn, signInTime, date, signOut, status } = body;
  const newDate = new Date(date);

  const profile = await prisma.studentProfile.findUnique({
    where : {
      userId : session.id
    }
  })

  const newAttendance = await prisma.attendance.create({
    data: {
      studentId: profile.id,
      senseiId: senseiId,
      name: profile.name ,
      date: newDate.toISOString(),
      signIn: signIn,
      signOut: signOut,
      signInTime: signInTime,
      signOutTime: null,
      status: status,
    },
  });

  return NextResponse.json({
    status: 'success',
    data: { newAttendance },
  });
}
