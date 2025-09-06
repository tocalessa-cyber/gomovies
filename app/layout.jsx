import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AdsterraLayoutWrapper from '../components/AdsterraLayoutWrapper';

export const metadata = {
  title: 'Himovies | Free HD Movie & TV Show Streaming',
  description: 'Watch the latest movies and TV shows for free in HD quality. Explore thousands of movie and TV series titles without limits.',
  openGraph: {
    title: 'Himovies | Free HD Movie & TV Show Streaming',
    description: 'Watch the latest movies and TV shows for free in HD quality. Explore thousands of movie and TV series titles without limits.',
    url: 'https://himovies-us.netlify.app/',
    siteName: 'Himovies',
    images: [
      {
        url: 'https://live.staticflickr.com/65535/54768161569_c35e91f6c5_b.jpg',
        width: 1200,
        height: 630,
        alt: 'Himovies - Free HD Movie & TV Show Streaming',
      },
    ],
    locale: 'id_ID',
    type: 'website',
    // Properti yang diperlukan untuk Facebook Debugger
    appId: '100074345305108',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@WatchStream123',
    creator: '@WatchStream123',
    title: 'Himovies | Free HD Movie & TV Show Streaming',
    description: 'Watch the latest movies and TV shows for free in HD quality. Explore thousands of movie and TV series titles without limits.',
    images: ['https://live.staticflickr.com/65535/54768161569_c35e91f6c5_b.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AdsterraLayoutWrapper>
          <div className="flex flex-col min-h-screen bg-slate-900">
            <header className="w-full max-w-7xl mx-auto px-4 py-4 sticky top-0 z-50 bg-slate-900 shadow-lg">
              <Navbar />
            </header>
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 mt-2">
              {children}
            </main>
            <footer className="w-full max-w-7xl mx-auto px-4 py-8">
              <Footer />
            </footer>
          </div>
        </AdsterraLayoutWrapper>
      </body>
    </html>
  );
}
