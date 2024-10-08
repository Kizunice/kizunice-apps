import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function POST(req,res) {
  const session = await getCurrentUser(req, res);
  const body = await req.json();
  const { currentPassword, newPassword, confirmPassword } = body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error('Isi semua form password');

  }

  if (newPassword !== confirmPassword) {
    throw new Error('Konfirmasi Password salah');
  }

  const user = await prisma.user.findUnique({
    where: {
      id : session.id,
    },
  });

  if (!user) {
    throw new Error('Akun tidak tersedia, silahkan daftar');
  }

  const passwordMatch = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!passwordMatch) {
    throw new Error('Password lama salah');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const newPass = await prisma.user.update({
    where : {
        id: session.id
    },
    data: {
      password: hashedPassword,
    },
  });

  return NextResponse.json(newPass);
}
