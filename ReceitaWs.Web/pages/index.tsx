import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/features/login/hooks/useAuth';

export default function HomePage() {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      router.replace('/empresa');
    } else {
      router.replace('/login');
    }
  }, [token, router]);

  return null;
}
