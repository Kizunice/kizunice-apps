import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';


export async function GET(req,res) {
  const session = await getCurrentUser(req, res);

  if(session.role === "PARTNER") {
    const profile = await prisma.partnerProfile.findUnique({
      where: {
        userId : session.id,
      },
    });
    const jobs = await prisma.jobOpportunity.findMany({
      where: {
        supervisorId: profile.id
      },
      include: {
        company: true,
        supervisor: true,
        applications: {
          include: {
            student : true,
          }
        },
      },
      orderBy: {
        createdAt : "desc"
      }
    }); 
    return NextResponse.json(jobs);
  } 
    const jobs = await prisma.jobOpportunity.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include : {
        company : true,
        supervisor: true
      }
    });
  
    //return response JSON
    return NextResponse.json(jobs);
  }


export async function POST(req,res) {
    const session = await getCurrentUser(req, res);
    const body = await req.json();
    const {id, companyId, supervisorId, title, fieldJob, typeJob, description, needs, gender, location, requirement, detail, benefit, salary, departure, interview, deadline, linkFile } = body;

    const newJobs = await prisma.jobOpportunity.upsert({
      where : {
        id : id || ''
      },
      update: {
        companyId ,
        supervisorId,
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
        linkFile,     
        deadline: new Date(deadline).toISOString(),
        departure: new Date(departure).toISOString(),
        interview: new Date(interview).toISOString()
      },
      create: {
        companyId ,
        supervisorId,
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
        linkFile,     
        deadline: new Date(deadline).toISOString(),
        departure: new Date(departure).toISOString(),
        interview: new Date(interview).toISOString()
      },
    });
  
    return NextResponse.json(newJobs);
  }