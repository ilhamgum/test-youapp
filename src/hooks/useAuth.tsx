'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getCookie } from 'cookies-next';

import axios from '@/utils/axios';

import { UserProps } from '@/types/user';

const useAuth = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [refresher, setRefresher] = useState(false);

  const token = getCookie('youapp_access_token');

  const refreshProfile = () => {
    setRefresher(!refresher);
  };

  useEffect(() => {
    axios
      .get('api/getProfile')
      .then((res) => setUser(res.data.data))
      .catch((err) => console.error(err));
  }, [refresher]);

  return { token, user, refreshProfile };
};

export const AuthGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { push } = useRouter();
  const pathname = usePathname();

  const { token } = useAuth();

  // check token
  useEffect(() => {
    const isAuthPage = pathname.includes('login') || pathname.includes('register');
    // if not authenticated
    if (!token) {
      push('/login');
    }

    // if already authenticated
    if (isAuthPage && token) {
      push('/');
    }
  }, [token, push, pathname]);

  return <>{children}</>;
};

export default useAuth;
