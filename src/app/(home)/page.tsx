import { PencilSquareIcon } from '@heroicons/react/24/outline';

import { Card } from '@/components/atoms/card';

export default function Home() {
  return (
    <div className="space-y-4">
      <Card className="relative min-h-[250px] border-none bg-[#162329] text-white">
        <PencilSquareIcon className="absolute right-0 top-0 m-5 h-6 w-6" />
        <p className="absolute bottom-0 left-0 m-5 text-2xl font-semibold">@johndoe</p>
      </Card>
      <Card className="min-h-[180px] border-none bg-[#0E191F] p-5 text-white">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">About</p>
          <PencilSquareIcon className="h-6 w-6" />
        </div>
        <p className="mt-4 text-[#FFFFFF85]">Add in your your to help others know you better</p>
      </Card>
      <Card className="min-h-[180px] border-none bg-[#0E191F] p-5 text-white">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Interest</p>
          <PencilSquareIcon className="h-6 w-6" />
        </div>
        <p className="mt-4 text-[#FFFFFF85]">Add in your interest to find a better match</p>
      </Card>
    </div>
  );
}
