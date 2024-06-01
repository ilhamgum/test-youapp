'use client';

import useAuth from '@/hooks/useAuth';

const Interests = () => {
  const { user } = useAuth();

  return user?.interest ? (
    <ul className="mt-4 flex items-center space-x-4">
      {user.interest.map((interest, index) => (
        <li key={index} className="rounded-full bg-gray-700/25 px-4 py-2">
          <p>{interest.label}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="mt-4 text-[#FFFFFF85]">Add in your interest to find a better match</p>
  );
};

export default Interests;
