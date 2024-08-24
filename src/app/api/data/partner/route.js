import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,res) {
  const session = await getCurrentUser(req, res);
  if(session.role === "ADMIN" || session.role === "DOCUMENT") {
    const profile = await prisma.partnerProfile.findMany({
      orderBy : {
        name: "asc"
      },
      include : {
          company : true
      }
    });
  
    //return response JSON
    return NextResponse.json(profile);
  }

  const partnerProfil = await prisma.partnerProfile.findUnique({
    where : {
      userId : session.id
    },
    include : {
      company : {
        orderBy : {
          name : "asc"
        }
      }
    }
  });

  return NextResponse.json(partnerProfil);
}


export async function POST(req,res) {
  const session = await getCurrentUser(req, res);
  const body = await req.json();
  const {name,address,phone} =body

  const profile = await prisma.partnerProfile.findUnique({
    where:{
      userId : session.id
    }
  })

  const company = await prisma.companies.create({
    data: {
      name,
      address,
      phone,
      supervisorId : profile.id
    },
  });

  return NextResponse.json(company);
}

export async function DELETE(req,{ params }) {
  console.log(params)
  await prisma.companies.delete({
    where: {
      id: params.partnerId,
    },
  });
  return NextResponse.json({ message: "done" });
}
 