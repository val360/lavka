import Header from './Header';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-black text-white">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
