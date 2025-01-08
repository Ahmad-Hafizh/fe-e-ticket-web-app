'use client';
import { useAppSelector } from '@/lib/redux/hooks';
import { redirect } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface IAuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: React.FC<IAuthGuardProps> = ({ children }) => {
  const user = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    if (!user?.isAuth) {
      redirect('/sign-in');
    }
  }, [user]);
  return <>{children}</>;
};
