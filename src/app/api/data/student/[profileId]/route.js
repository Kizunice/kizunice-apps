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
            },
            orderBy : {
              createdAt : 'desc'
            }
        },
        financeTransactions: {
          orderBy : {
            createdAt : 'desc'
          }
        },
        jobApplications: {
          include : {
            student: true,
            partner: true,
            job: {
              include : {
                company: true
              }
            }
          },
          orderBy : {
            createdAt : 'desc'
          }
        },
    }
  });

  return NextResponse.json(profile);
}
