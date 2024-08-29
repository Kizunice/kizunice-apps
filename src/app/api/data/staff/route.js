import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,res) {
  const session = await getCurrentUser(req, res);
  if (!session) {
    return new NextResponse('Error! Need Authentication!', { status: 400 });
  }

  if(session.role === "ADMIN" || session.role === "MASTER") {
    const staffprofile = await prisma.staffProfile.findMany({
        orderBy : {
          name: "asc"
        },
      });

    return NextResponse.json(staffprofile);
  }

  if(session.role === "DOCUMENT" || session.role === "FINANCE") {
    const profile = await prisma.staffProfile.findUnique({
        where : {
          userId : session.id
        },
      });
    return NextResponse.json(profile);
  } 
}


export async function POST(req,res) {
  const session = await getCurrentUser(req, res);
  const body = await req.json();
  const {
    userId,
    image,
    role,
    name,
    email,
    phone,
    address,
    gender,
    dateOfBirth,
    placeOfBirth,
  } = body;

  const newProfile = await prisma.staffProfile.update({
    where: {
      userId: session.id ,
    },
    data: {
      name,
      email,
      image,
      phone,
      address,
      gender,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null,
      placeOfBirth,
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

    const profile = await prisma.staffProfile.delete({
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
  
