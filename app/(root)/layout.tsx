import Navbar from '@/components/navigation/navbar';

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <>
    <Navbar />
    {children}
    </>
  );
}