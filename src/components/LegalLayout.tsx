import Navbar from './Navbar';
import Footer from './Footer';

export default function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <div className="section-padding">
          <div className="container-width">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </h1>
              <div className="prose-sm prose-gray mt-8 max-w-none [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-gray-600 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-gray-600 [&_li]:mb-1">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
