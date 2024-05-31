import Link from 'next/link';

import { ChevronLeftIcon } from '@heroicons/react/20/solid';

import LoginForm from './_components/form';

const Login = () => {
  return (
    <div className="p-6">
      <div className="flex items-center space-x-1 text-white">
        <ChevronLeftIcon className="h-6 w-6" />
        <Link href={'/'}>
          <p className="font-semibold">Back</p>
        </Link>
      </div>

      <div className="mt-16">
        <h1 className="mb-8 ml-4 text-2xl font-bold text-white">Login</h1>
        <LoginForm />
        <p className="mt-14 text-center text-white">
          No account?{' '}
          <Link href="/register">
            <span className="cursor-pointer border-b border-[#F3EDA6] bg-gradient-to-r from-[#F3EDA6] via-[#94783E] to-[#F3EDA6] bg-clip-text text-transparent">
              Register here
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
