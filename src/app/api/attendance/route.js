import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Unauthorized', { status: 403 });
  }

  const body = await request.json();

  const newAttendance = await prisma.attendance.create({
    data: {
      studentId: session.user.id,
      date: body.date,
      clockIn: body.clockIn,
      clockOut: body.clockOut,
      status: body.status,
    },
  });
  return new Response(JSON.stringify(newAttendance));
}

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Unauthorized', { status: 403 });
  }
}
