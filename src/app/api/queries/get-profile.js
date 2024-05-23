import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';

export async function fetchAllProfile() {
  const user = getCurrentUser();
  // if (user) {
  //   let profile = await prisma.studentProfile.findUnique({
  //     where: {
  //       userId: user.id,
  //     },
  //   });
  //   return profile;
  // }
  return user;
}

export async function fetchProfile(user) {
  return await prisma.studentProfile.findUnique({
    where: {
      userId: user.id,
    },
  });
}
