import React from 'react';

import Navbar from '@/components/organisms/navbar';

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <nav className="p-6">
        <Navbar />
      </nav>
      <main className="px-6">{children}</main>
    </>
  );
};

export default HomeLayout;
