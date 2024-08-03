import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,res) {
  const session = await getCurrentUser(req, res);
  if(session.role === "ADMIN") {
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