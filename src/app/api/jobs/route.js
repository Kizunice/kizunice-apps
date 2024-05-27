import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';


export async function GET(req) {
    const learning = await prisma.jobOpportunity.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  
    //return response JSON
    return NextResponse.json(learning);
  }


export async function POST(req,res) {
    const session = await getCurrentUser(req, res);
    const body = await req.json();
    const { userId, name, title, fieldJob, typeJob, description, needs, gender, location, requirement, detail, benefit, salary, deadline } = body;

  
    const newDate = new Date(deadline);
  
    const newJobs = await prisma.jobOpportunity.create({
      data: {
        postedBy : session.id,
        title,  
        fieldJob,           
        typeJob,              
        description ,        
        needs ,     
        gender,        
        location,            
        requirement ,        
        detail  ,         
        benefit ,            
        salary ,            
        deadline: newDate.toISOString()
      },
    });
  
    return NextResponse.json(newJobs);
  }