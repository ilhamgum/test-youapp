'use client';

import Link from 'next/link';

import { ChevronLeftIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid';

import useAuth from '@/hooks/useAuth';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between text-white">
      <div className="flex items-center space-x-1">
        <ChevronLeftIcon className="h-6 w-6" />
        <Link href={'/'}>
          <p className="font-semibold">Back</p>
        </Link>
      </div>

      <p className="text-lg">@ {user?.name ? user?.name.replace(/[\s]/gi, '').toLowerCase() : 'username'}</p>

      <EllipsisHorizontalIcon className="h-10 w-10" />
    </div>
  );
};

export default Navbar;
