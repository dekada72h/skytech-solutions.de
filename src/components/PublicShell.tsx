import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">{children}</div>
      <Footer />
    </div>
  );
}
