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
    const { jobId, partnerId, studentId, status, note} = body;

    const application = await prisma.jobApplication.create({
      data: {
        jobId ,
        studentId,
        partnerId,  
        status,           
        note
      },
    });
  
    return NextResponse.json(application);
  }