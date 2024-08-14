import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req, { params }) {
    console.log(params)
    if (!params.financeId) {
      return new NextResponse('LearningId is required', { status: 400 });
    }
    const data = await prisma.financeTransaction.findUnique({
      where: {
        id: params.financeId,
      },
      include: {
        student: true,
      },
    });
  
    return NextResponse.json(data);
  }

  
export async function POST(req,res) {
    const session = await getCurrentUser(req, res);
    const body = await req.json();
    const { userId, studentId, transactionType, studentPayment, transactionDate, amount, description, id } = body;
    const newDate = new Date(transactionDate);

    const defaultTotalAmount = 41000000

    if (session.role === "ADMIN" || session.role === "FINANCE" ) {
        let payment = []
        const paymentAmount = await prisma.financeTransaction.findMany({
          where : {
            studentId
          }
        })
        paymentAmount.forEach(val => {
          payment.push(parseFloat(val.amount))
        });
        const totalPayment = payment.reduce((amt, a) => amt + a, 0)

        const finance = await prisma.financeTransaction.update({
          where : {
            id : id 
          },
          data: {
            userId : session.id || userId,
            studentId : studentId ? studentId : null,
            studentPayment,
            transactionType,  
            transactionDate: newDate.toISOString(),           
            amount: parseFloat(amount),              
            amountLeft: defaultTotalAmount-(totalPayment+parseFloat(amount)),           
            description , 
          },
        });

        return NextResponse.json(finance);
    }
  }

  export async function DELETE(req,{ params }) {
    console.log(params)
    await prisma.financeTransaction.delete({
      where: {
        id: params.financeId,
      },
    });
  
    return NextResponse.json({ message: "done" });
  }  