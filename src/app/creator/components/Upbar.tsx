'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useAppSelector } from '@/lib/redux/hooks';

const Upbar = () => {
  const path = usePathname().split('/');
  const user = useAppSelector((state) => state.userReducer);
  return (
    <div className="flex justify-between items-center px-10 border-b pb-4">
      <p>
        <span className="text-2xl capitalize">{path[path.length - 1].replace('-', ' ')}</span>
      </p>
      <div className="flex justify-end items-center gap-4">
        <Link href={'/'} className="px-4 py-2 border rounded-md">
          Switch to user
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:outline-none">
            <div className="flex justify-center items-center gap-2">
              <Avatar className="w-9 h-9">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start gap-0.5">
                <p className="leading-none">{user.name}</p>
                <p className="text-sm leading-none text-gray-400">{user.email}</p>
              </div>
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" className="w-full">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Upbar;
