import Link from 'next/link';

import { PencilSquareIcon } from '@heroicons/react/24/outline';

import { Card } from '@/components/atoms/card';

import AboutForm from './_components/about/form';
import Interests from './_components/interests';
import ProfilePhoto from './_components/profile-photo';

export default function Home() {
  return (
    <div className="space-y-4">
      <ProfilePhoto />

      <Card className="min-h-[180px] border-none bg-[#0E191F] p-5 text-white">
        <AboutForm />
      </Card>

      <Card className="min-h-[180px] border-none bg-[#0E191F] p-5 text-white">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Interest</p>
          <Link href={'/interest'}>
            <PencilSquareIcon className="h-6 w-6" />
          </Link>
        </div>

        <Interests />
      </Card>
    </div>
  );
}
