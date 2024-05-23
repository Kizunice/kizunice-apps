import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req) {
  // const user = getCurrentUser();
  // const { id } = req.query;
  // const id = clvaypyfv0001118c1ojfnlgk;
  // const profile = await prisma.studentProfile.findUnique({
  //   where: {
  //     userId: id,
  //   },
  // });
  const profile = await prisma.studentProfile.findMany();

  //return response JSON
  return NextResponse.json(profile);
}

export async function POST(req) {
  const body = await req.json();
  const {
    userId,
    name,
    email,
    phone,
    address,
    gender,
    age,
    dateOfBirth,
    placeOfBirth,
    bodyHeight,
    bodyWeight,
  } = body;

  const newDate = new Date(dateOfBirth);

  const newProfile = await prisma.studentProfile.upsert({
    where: {
      userId: userId || '',
    },
    update: {
      name: name,
      email: email,
      phone: phone,
      address: address,
      gender: gender,
      age: parseInt(age),
      dateOfBirth: newDate.toISOString(),
      placeOfBirth: placeOfBirth,
      bodyHeight: bodyHeight,
      bodyWeight: bodyWeight,
    },
    create: {
      userId: userId,
      name: name,
      email: email,
      phone: phone,
      address: address,
      gender: gender,
      age: parseInt(age),
      dateOfBirth: newDate.toISOString(),
      placeOfBirth: placeOfBirth,
      bodyHeight: bodyHeight,
      bodyWeight: bodyWeight,
    },
  });

  return NextResponse.json(newProfile);
}
