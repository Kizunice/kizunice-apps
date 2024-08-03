import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const { name, email, password, phone, address, gender, placeOfBirth, dateOfBirth } = body;

  if (!name || !email || !password) {
    return new NextResponse('Missing Fields', { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "SENSEI"
    },
  });
  
  const newDate = new Date(dateOfBirth);

  const profile = await prisma.senseiProfile.upsert({
    where: {
      userId: user.id || '',
    },
    update: {
      name: user.name,
      email: user.email,
    },
    create: {
      userId: user.id,
      name: user.name,
      email: user.email,
      phone,
      address,
      gender,
      dateOfBirth: newDate.toISOString(),
      placeOfBirth,
    },
  });

  return NextResponse.json(user,profile);
}
