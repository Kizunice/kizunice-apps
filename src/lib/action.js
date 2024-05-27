import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function getTotalStudent() {
    return await prisma.user.findMany({
        include: {
            _count: {
              select: { role: "STUDENT" },
            },
          },
    })
}