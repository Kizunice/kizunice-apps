import prisma from '@/lib/prisma';

export async function fetchUsers() {
  return await prisma.user.findMany();
}
