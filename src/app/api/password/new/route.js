import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function POST(req,res) {
  const session = await getCurrentUser(req, res);
  const body = await req.json();
  const {userId, newPassword, confirmPassword } = body;

  if ( !newPassword || !confirmPassword) {
    return new NextResponse('Input Password tidak ada', { status: 400 });
  }

  if (newPassword !== confirmPassword) {
    return new NextResponse('Konfirmasi Password salah', { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id : userId,
    },
  });

  if (!user) {
    throw new Error('Akun tidak tersedia, silahkan daftar');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const newPass = await prisma.user.update({
    where : {
        id: userId
    },
    data: {
      password: hashedPassword,
    },
  });

  return NextResponse.json(newPass);
}
