import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AdsterraLayoutWrapper from '../components/AdsterraLayoutWrapper';

export const metadata = {
  title: 'Gomovies123 | Watch Movies, Stream TV Series Free - Complete Movie Database',
  description: 'Gomovies123 is your ultimate movie database with 10,000+ movies, 5,000+ TV series, actor profiles, genre pages, and yearly archives. Discover, stream, and enjoy cinematic excellence with our comprehensive entertainment platform.',
  keywords: 'movies, tv series, streaming, movie database, actors, genres, rankings, movie archives',
  openGraph: {
    title: 'Gomovies123 | Complete Movie & TV Series Database',
    description: 'Your ultimate destination for movies, TV series, actor profiles, and streaming information. Explore genres, yearly archives, and top rankings.',
    url: 'https://gomovies123.vercel.app/',
    siteName: 'Gomovies123',
    images: [
      {
        url: 'https://live.staticflickr.com/65535/54796879356_0cf11547b4_b.jpg',
        width: 1200,
        height: 630,
        alt: 'Gomovies123 - Complete Movie Database',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Gomovies123',
    creator: '@Gomovies123',
    title: 'Gomovies123 | Complete Movie & TV Series Database',
    description: 'Explore 10,000+ movies, 5,000+ TV series, actor profiles, and streaming guides on Gomovies123.',
    images: ['https://live.staticflickr.com/65535/54796879356_0cf11547b4_b.jpg'],
  },
  // Tambahkan tag meta eksplisit untuk Facebook
  other: {
    'fb:app_id': '100074345305108',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
	  <head>
        {/* Tag verifikasi Google Search Console */}
        <meta name="google-site-verification" content="p3G8gbPM5atmqVkYXyzaATfRg6O6WsSLKI0GOk4mnfg" />
        {/* Schema.org markup untuk Movie Database */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MovieDatabase",
              "name": "Gomovies123",
              "description": "Complete movie and TV series database with streaming information",
              "url": "https://gomovies123.vercel.app/",
              "logo": "https://live.staticflickr.com/65535/54796879356_0cf11547b4_b.jpg",
              "sameAs": [
                "https://gomovies123.vercel.app/"
              ]
            })
          }}
        />
      </head>
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
              {/* Tempatkan div Native Banner di sini, sebelum Footer */}
              <div id="container-75a330c0010036df621f28cf1fa626d0"></div>
              <Footer />
            </footer>
          </div>
        </AdsterraLayoutWrapper>
      </body>
    </html>
  );
}