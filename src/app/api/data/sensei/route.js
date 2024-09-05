import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,res) {
  const session = await getCurrentUser(req, res);
  if (!session) {
    return new NextResponse('Error! Need Authentication!', { status: 400 });
  }

  if(session) {
    const profile = await prisma.senseiProfile.findMany({
        orderBy : {
          name: "asc"
        },
      });
    
      //return response JSON
      return NextResponse.json(profile);
  }

  const senseiProfil = await prisma.senseiProfile.findUnique({
    where : {
        userId : session.id
    },
  });

  return NextResponse.json(senseiProfil);
}


export async function POST(req,res) {
  const session = await getCurrentUser(req, res);
  const body = await req.json();
  const {
    userId,
    image,
    name,
    email,
    phone,
    address,
    gender,
    dateOfBirth,
    placeOfBirth,
  } = body;

  const newDate = new Date(dateOfBirth);

  const newProfile = await prisma.senseiProfile.upsert({
    where: {
      userId: session.id ,
    },
    update: {
      name,
      email,
      image,
      phone,
      address,
      gender,
      dateOfBirth: dateOfBirth ? newDate.toISOString() : null,
      placeOfBirth,
    },
    create: {
      userId: session.id,
      name: name,
      image: image,
      email: email,
      phone: phone,
      address: address,
      gender: gender,
      dateOfBirth: dateOfBirth ? newDate.toISOString() : null,
      placeOfBirth: placeOfBirth,
    },
  });

  if (image) {
    await prisma.user.update({
      where:{
        id: userId,
      },
      data:{
        image: image
      }
    })
  }
  
  return NextResponse.json(newProfile);
}


export async function DELETE(req) {
  const body = await req.json();

  const profile = await prisma.senseiProfile.delete({
    where: {
      id: body,
    },
  });

  await prisma.user.delete({
    where: {
      id: profile.userId,
    },
  });
  
  return NextResponse.json({ message: "done" });
}

