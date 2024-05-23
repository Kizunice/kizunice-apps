import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const attendance = await prisma.attendance.findMany();

  //return response JSON
  return NextResponse.json(attendance);
}

export async function POST(req) {
  const body = await req.json();
  const { userId, name, signIn, signInTime, date, signOut, status } = body;

  const newDate = new Date(date);

  const newAttendance = await prisma.attendance.create({
    data: {
      userId: userId,
      name: name,
      date: newDate.toISOString(),
      signIn: signIn,
      signOut: signOut,
      signInTime: signInTime,
      signOutTime: new Date(),
      status: status,
    },
  });

  return NextResponse.json(newAttendance);
}
