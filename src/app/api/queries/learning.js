import prisma from '@/lib/prisma';

export async function fetchAll() {
  return await prisma.learning.findMany();
}

export async function getSensei(id) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}
