import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';


export async function GET(req,res) {
  const session = await getCurrentUser(req, res);
    if (session.role === "FINANCE" || session.role === "ADMIN") {
      const transaction = await prisma.financeTransaction.findMany({
        orderBy: {
          transactionDate: 'desc',
        },
        include : {
          student:true
        }
      });
    
      return NextResponse.json(transaction);
    }
  }


export async function POST(req,res) {
    const session = await getCurrentUser(req, res);
    const body = await req.json();
    const { userId, studentId, transactionType, studentPayment, transactionDate, amount, description } = body;
    const newDate = new Date(transactionDate);

    const defaulTotalAmount = 41000000
    if (session.role === "ADMIN" || session.role === "FINANCE" ) {
        const finance = await prisma.financeTransaction.create({
            data: {
              userId : session.id || userId,
              studentId : studentId ? studentId : null,
              studentPayment,
              transactionType,  
              transactionDate: newDate.toISOString(),           
              amount: parseFloat(amount),              
              amountLeft: defaulTotalAmount - parseFloat(amount),              
              description , 
            },
          });

        return NextResponse.json(finance);
    }
  }