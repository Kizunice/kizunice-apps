import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req, { params }) {
  console.log(params)
  if (!params.profileId) {
    return new NextResponse('LearningId is required', { status: 400 });
  }
  const profile = await prisma.studentProfile.findUnique({
    where: {
      id : params.profileId,
    },
    include:{
        scores: {
            include : {
                learning: true,
                sensei : true,
            }
        },
        financeTransactions: true,
        jobApplications: {
          include : {
            student: true,
            partner: true,
            job: {
              include : {
                company: true
              }
            }
          }
        },
    }
  });

  return NextResponse.json(profile);
}
