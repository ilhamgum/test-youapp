import Link from 'next/link';
import React from 'react';

import { ChevronLeftIcon } from '@heroicons/react/20/solid';

import RegisterForm from './_components/form';

const Register = () => {
  return (
    <div className="p-6">
      <div className="flex items-center space-x-1 text-white">
        <ChevronLeftIcon className="h-6 w-6" />
        <Link href={'/'}>
          <p className="font-semibold">Back</p>
        </Link>
      </div>

      <div className="mt-16">
        <h1 className="mb-8 ml-4 text-2xl font-bold text-white">Register</h1>
        <RegisterForm />
        <p className="mt-14 text-center text-white">
          Have an account?{' '}
          <Link href="/login">
            <span className="text-gradient border-b border-[#F3EDA6]">Login here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
