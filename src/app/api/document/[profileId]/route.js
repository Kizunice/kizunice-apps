import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import ExcelJS from 'exceljs';

export async function GET(req,res,{params}) {
  const profile = await prisma.studentProfile.findUnique({
    where: {
      id: params.profileId,
    },
  });

  if (profile) {
    const doc = await prisma.document.findUnique({
      where: {
        profileId : profile.id
      }
    })
    return NextResponse.json(doc);
  }
}
