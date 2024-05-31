const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="min-h-screen bg-[url(/img/app-bg.png)] bg-cover bg-center bg-no-repeat">{children}</div>;
};

export default AuthLayout;
