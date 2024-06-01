import { AuthGuard } from '@/hooks/useAuth';

import Navbar from '@/components/organisms/navbar';

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthGuard>
      <nav className="p-6">
        <Navbar />
      </nav>
      <main className="px-6">{children}</main>
    </AuthGuard>
  );
};

export default HomeLayout;
