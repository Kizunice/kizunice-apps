import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  //get all posts
  const profile = await prisma.user.findMany();

  //return response JSON
  return NextResponse.json(profile);
}
