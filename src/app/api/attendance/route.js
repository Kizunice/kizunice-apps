import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req, res) {
  const session = await getCurrentUser(req, res);

  if (session.role === 'ADMIN') {
    const allAttendance = await prisma.attendance.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(allAttendance);
  }
  const attendance = await prisma.attendance.findMany({
    where: {
      userId: session.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(attendance);
}

export async function POST(req, res) {
  const body = await req.json();
  const session = await getCurrentUser(req, res);

  const { userId, name, signIn, signInTime, date, signOut, status } = body;
  const newDate = new Date(date);

  const newAttendance = await prisma.attendance.create({
    data: {
      userId: userId || session.id,
      name: name || session.name,
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
