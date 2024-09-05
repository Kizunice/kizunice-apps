import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';


export async function POST(req, res) {
    const session = await getCurrentUser(req, res);

    const body = await req.json();
    const {
      userId,
      accStatus
    } = body;

    const user = await prisma.user.findUnique({
      where: {
        id : session.id
      },
    });

    const target = await prisma.user.findUnique({
        where: {
          id : userId
        },
    });

    if(target.role === "SENSEI") {
        await prisma.senseiProfile.update({
            where: {
                userId: target.id,
            },
            data: {
                accStatus
            },
        });
    } else if(target.role === "DOCUMENT" || "FINANCE") {
        await prisma.staffProfile.update({
            where: {
                userId: target.id,
            },
            data: {
                accStatus
            },
        });
    }

    if (user.role === "ADMIN" || user.role === "MASTER" ) {
        const status = await prisma.user.update({
            where: {
              id : userId
            },
            data: {
              status : accStatus
            },
        });
        return NextResponse.json({message : "done", status});
    }
  }
  