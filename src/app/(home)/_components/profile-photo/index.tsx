'use client';

import Image from 'next/image';

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { differenceInYears } from 'date-fns';

import useAuth from '@/hooks/useAuth';

import { Card } from '@/components/atoms/card';

const ProfilePhoto = () => {
  const { user } = useAuth();

  return (
    <Card className="relative min-h-[250px] border-none bg-[#162329] text-white">
      {user?.image ? (
        <>
          <Image fill alt="profile-image" src={user?.image} />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%)',
            }}
          />
        </>
      ) : null}
      <div className="absolute bottom-0 left-0 m-5">
        <p className="text-2xl font-semibold">
          @{user?.name ? user?.name.replace(/[\s]/gi, '').toLowerCase() : 'username'}
          {user?.birthday ? <span>, {differenceInYears(new Date(), user.birthday)}</span> : null}
        </p>
        {user?.gender ? <p className="mt-1 text-lg capitalize">{user.gender}</p> : null}
        {user?.horoscope && user.zodiac ? (
          <div className="mt-3 flex items-center space-x-3">
            <p className="glass flex items-center space-x-1 rounded-full px-3 py-3">
              <QuestionMarkCircleIcon className="h-6 w-6" />
              <span>{user.zodiac}</span>
            </p>
            <p className="glass flex items-center space-x-1 rounded-full px-3 py-3">
              <QuestionMarkCircleIcon className="h-6 w-6" />
              <span>{user.horoscope}</span>
            </p>
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default ProfilePhoto;
