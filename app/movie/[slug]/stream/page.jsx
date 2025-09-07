import { notFound } from 'next/navigation';
import { getMovieById, getSimilarMovies, getMovieByTitle } from '../../../../lib/api'; // Mengimpor fungsi baru
import WatchClient from './WatchClient';

// ===================================
// MAIN SERVER COMPONENT
// ===================================
// This is a server component that fetches data and passes it to the client component.
export default async function StreamPage({ params }) {
    const { slug } = await params;

    let id = parseInt(slug.split('-').pop(), 10);
    let movieDetails = null;

    // First, try to get the movie ID from the end of the slug
    if (!isNaN(id)) {
        movieDetails = await getMovieById(id);
    }
    
    // If movie details were not found using the ID, or if the slug didn't have an ID,
    // try to get the movie by its title.
    if (!movieDetails) {
        const titleSlug = slug.replace(/-\d+$/, ''); // Menghapus ID dari slug jika ada
        const searchResults = await getMovieByTitle(titleSlug); // Menggunakan fungsi baru
        if (searchResults && searchResults.length > 0) {
            id = searchResults[0].id;
            movieDetails = searchResults[0];
        }
    }

    // If movie details are still not found, show a 404 page
    if (!movieDetails) {
        notFound();
    }

    // Fetch similar movies
    const similarMovies = await getSimilarMovies(id);

    // Pass the fetched data as props to the client component
    return (
        <WatchClient
            mediaType="movie"
            id={movieDetails.id}
            initialDetails={movieDetails}
            initialSimilarMedia={similarMovies}
        />
    );
}
