import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function getCurrentUser(req, res) {
  const session = await getServerSession(
    req,
    {
      ...res,
      getHeader: (name) => res.headers?.get(name),
      setHeader: (name, value) => res.headers?.set(name, value),
    },
    authOptions
  );

  return session?.user;
}
