import Navbar from '@/components/navigation/navbar';

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <>
      <Navbar />
      <main>
        <section className='max-w-[1260px] mx-auto p-2 sm:p-5 flex flex-col items-center justify-center'>
          {children}
        </section>
      </main>
    </>
  );
}