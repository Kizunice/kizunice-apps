import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,res) {
  const session = await getCurrentUser(req, res);
  if (!session) {
    return new NextResponse('Error! Need Authentication!', { status: 400 });
  }
  
  if (session.role === "PARTNER") {
    const profile = await prisma.partnerProfile.findUnique({
      where : {
        userId : session.id
      }
    })
    const application = await prisma.jobApplication.findMany({
      where : {
          partnerId : profile.id
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        job: {
            include : {
                company : true
            }
        },
        student: true,
        partner: true,
      }
    });
    return NextResponse.json(application);
  }

  const application = await prisma.jobApplication.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      job: {
          include : {
              company : true
          }
      },
      student: true,
      partner: true,
    }
  });

  return NextResponse.json(application);
}


  export async function POST(req,res) {
    const body = await req.json();
    const { jobId, partnerId, studentId, status, note, id} = body;
    
    const application = await prisma.jobApplication.upsert({
      where : {
        id : id || ''
      },
      update : {
        jobId ,
        studentId,
        partnerId,  
        status,           
        note
      },
      create : {
        jobId ,
        studentId,
        partnerId,  
        status,           
        note
      },
    });

    if (status === "Diterima") {
      await prisma.studentProfile.update({
        where : {
          id : studentId
        },
        data : {
          isHired : true
        }
      })
    } else if (status === "Ditolak") {
      await prisma.studentProfile.update({
        where : {
          id : studentId
        },
        data : {
          isHired : false
        }
      })
    }
   

    return NextResponse.json(application);
  }
    


  