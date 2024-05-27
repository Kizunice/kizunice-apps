import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req, res) {
    const session = await getCurrentUser(req, res);
  
    if (session.role === 'ADMIN') {
        // const students = await prisma.user.findMany({
        //     include: {
        //         _count: {
        //           select: { role: "STUDENT" },
        //         },
        //       },
        // })
        const students = await prisma.user.groupBy({
            by: ['role'],
            where: {
                role : "STUDENT"},
            _count: {
                _all: true,
            },
        })
      
        return NextResponse.json(students);
    }
  }