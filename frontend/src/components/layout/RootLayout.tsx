import Header from './Header';
import Footer from './Footer';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
      </div>
      <Footer />
    </>
  );
} 