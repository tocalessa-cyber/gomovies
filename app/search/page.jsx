import { searchMoviesAndTv } from '../../lib/api.jsx';
import MovieList from '../../components/MovieList.jsx';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function SearchPage({ searchParams }) {
  // Fix: Added 'await' to ensure searchParams is resolved
  const { query } = await searchParams;

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white p-8 bg-slate-900">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Search Movies</h1>
        <p className="text-lg text-gray-400 text-center mb-8">
          Please enter the name of the movie you want to search for in the search box.
        </p>
        <Link href="/">
          <span className="text-blue-400 hover:text-blue-600 transition-colors duration-300">
            Back to Home
          </span>
        </Link>
      </div>
    );
  }

  const movies = await searchMoviesAndTv(query);

  return (
    <main className="min-h-screen p-8 bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-2 text-center">
        Search Results for &quot;{query}&quot;
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Found {movies.length} results.
      </p>

      {/* Renders the MovieList component to display the list of search results */}
      <MovieList movies={movies} />
    </main>
  );
}
