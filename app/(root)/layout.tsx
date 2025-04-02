import Navbar from '@/components/navigation/navbar';

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
    <Navbar />
    {children}
    </>
  );
}