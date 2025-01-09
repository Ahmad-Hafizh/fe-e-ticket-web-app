'use client';
import { useAppSelector } from '@/lib/redux/hooks';
import { redirect } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface IAuthGuardProps {
  children: ReactNode;
}

export const OrgAuthGuard: React.FC<IAuthGuardProps> = ({ children }) => {
  const user = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    if (Object.hasOwn(user, 'isAuth')) {
      if (!user?.isAuth && user.role === 'user') {
        redirect('/');
      }
    }
  }, [user]);
  return <>{children}</>;
};
