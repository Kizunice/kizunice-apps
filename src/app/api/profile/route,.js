import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Unauthorized', { status: 403 });
  }

  const body = await request.json();

  const fetchProfile = await prisma.profile.findUnique({
    where: {
      studentId: body.id,
    },
  });
  return new Response(JSON.stringify(fetchProfile));
}

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Unauthorized', { status: 403 });
  }

  const body = await request.json();

  const updateProfile = await prisma.profile.update({
    where: {
      studentId: body.id,
    },
    data: {},
  });
  return new Response(JSON.stringify(updateProfile));
}
