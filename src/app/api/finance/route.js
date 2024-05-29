import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';


export async function GET(req) {
    const transaction = await prisma.financeTransaction.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  
    //return response JSON
    return NextResponse.json(transaction);
  }


export async function POST(req,res) {
    const session = await getCurrentUser(req, res);
    const body = await req.json();
    const { userId, transactionType, transactionDate, amount, description } = body;
  
    const newDate = new Date(transactionDate);
    if (session.role === "ADMIN") {
        const finance = await prisma.financeTransaction.create({
            data: {
              userId : session.id,
              transactionType,  
              transactionDate: newDate.toISOString(),           
              amount: parseFloat(amount),              
              description ,        
            },
          });
        return NextResponse.json(finance);
    }
  }