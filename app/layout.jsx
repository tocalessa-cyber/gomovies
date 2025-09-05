// Untuk halaman dinamis seperti /movie/[id]
import { notFound } from 'next/navigation';
import { getMovieById } from '../../lib/api.jsx'; // Contoh fungsi API

export async function generateMetadata({ params }) {
  const { id } = params;
  const movie = await getMovieById(id);

  if (!movie) {
    return notFound();
  }

  return {
    title: movie.title,
    description: movie.plot,
    openGraph: {
      title: movie.title,
      description: movie.plot,
      url: `https://himovies-us.netlify.app/movie/${id}`,
      siteName: 'Himovies',
      images: [
        {
          url: movie.posterUrl, // Gunakan URL poster film yang sebenarnya
          width: 500,
          height: 750,
          alt: movie.title,
        },
      ],
      locale: 'id_ID',
      type: 'website',
      appId: '100074345305108',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@WatchStream123',
      creator: '@WatchStream123',
      title: movie.title,
      description: movie.plot,
      images: [movie.posterUrl],
    },
  };
}

export default async function MoviePage({ params }) {
  const { id } = params;
  const movie = await getMovieById(id);

  if (!movie) {
    return notFound();
  }

  return (
    <main className="min-h-screen p-8 bg-slate-900 text-white">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <p>{movie.plot}</p>
      {/* Konten halaman lainnya */}
    </main>
  );
}
