import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req) {
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