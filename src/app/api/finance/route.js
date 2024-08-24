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
    const { userId, studentId, transactionType, studentPayment, transactionDate, amount, description, id } = body;
    const newDate = new Date(transactionDate);

    const defaultTotalAmount = 41000000

    if (session.role === "FINANCE" ) {
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

      const profile = await prisma.staffProfile.findUnique({
        where : {
          userId : session.id
        }
      })

      const finance = await prisma.financeTransaction.create({
        data: {
          staffId : profile.id,
          studentId : studentId || null,
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