'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useCurrentSession from '@/hooks/use-current-session';

import AuthForm from './auth-form';

export default function Login() {
  const router = useRouter();
  const session = useCurrentSession();

  useEffect(() => {
    if (session) {
      console.log('redirecting to /');
      router.push('/');
    }
  }, [session, router]);

  return (
    <div className='row'>
      <div className='col-6'>
        <h1 className='header'>Supabase Auth + Storage</h1>
        <p>
          Experience our Auth and Storage through a simple profile management
          example. Create a user profile and upload an avatar image. Fast,
          simple, secure.
        </p>
      </div>
      <div className='col-6 auth-widget'>
        <AuthForm />
      </div>
    </div>
  );
}
