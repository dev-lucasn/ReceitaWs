'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/features/login/hooks/useAuth';
import LoginForm from '@/features/login/components/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      router.replace('/empresa');
    }
  }, [token, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </main>
  );
}
