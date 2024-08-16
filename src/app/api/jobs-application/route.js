import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';


export async function GET(req) {
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
  
    //return response JSON
    return NextResponse.json(application);
  }


  export async function POST(req,res) {
    const body = await req.json();
    const { jobId, partnerId, studentId, status, note, id} = body;
    const application = await prisma.jobApplication.upsert({
      where : {
        id
      },
      update : {
        jobId ,
        studentId,
        partnerId,  
        status : JSON.parse(status),           
        note
      },
      create : {
        jobId ,
        studentId,
        partnerId,  
        status : JSON.parse(status),           
        note
      },
    });

    const hired = status === true
    if(hired) {
      await prisma.studentProfile.update({
        where : {
          id : studentId
        },
        data : {
          isHired : status
        }
      })
    }
    return NextResponse.json(application);
  }