import { notFound } from 'next/navigation';
import { getMovieById, getSimilarMovies, getMovieByTitle, searchMoviesAndTv } from '../../../../lib/api'; 
import WatchClient from './WatchClient';

// Utility function to create a slug from a movie title
const createSlug = (item) => {
  const title = item.title;
  if (!title) return '';
  const baseSlug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
  
  let year = '';
  if (item.release_date) {
    year = item.release_date.substring(0, 4);
  }
  return `${baseSlug}-${year}`;
};

// ===================================
// MAIN SERVER COMPONENT
// ===================================
// This is a server component that fetches data and passes it to the client component.
export default async function StreamPage({ params }) {
    const { slug } = await params;

    let movieDetails = null;
    const id = parseInt(slug, 10);
  
    // Separate the slug into title and year, if a year exists
    const slugParts = slug.split('-');
    const lastPart = slugParts[slugParts.length - 1];
    const slugYear = /^\d{4}$/.test(lastPart) ? lastPart : null;
    const slugTitle = slugYear ? slugParts.slice(0, -1).join('-') : slug;
  
    // Check if the slug is a numeric ID
    if (!isNaN(id) && slugParts.length === 1) {
      movieDetails = await getMovieById(id);
    } else {
      // Search for the movie based on the title part of the slug
      const searchResults = await searchMoviesAndTv(slugTitle.replace(/-/g, ' '));
      
      let matchingMovie = searchResults.find(item => {
        const itemTitle = item.title?.toLowerCase().replace(/[^a-z0-9\s]/g, '');
        if (!itemTitle) {
          return false;
        }
  
        const slugTitleClean = slugTitle.toLowerCase().replace(/-/g, '').replace(/[^a-z0-9\s]/g, '');
  
        const titleMatch = itemTitle === slugTitleClean ||
                           itemTitle.replace(/\s/g, '') === slugTitleClean;
  
        const yearMatch = !slugYear || (item.release_date && item.release_date.substring(0, 4) === slugYear);
        
        return item.media_type === 'movie' && titleMatch && yearMatch;
      });
  
      if (matchingMovie) {
        movieDetails = await getMovieById(matchingMovie.id);
      }
    }

    // If movie details are still not found, show a 404 page
    if (!movieDetails) {
        notFound();
    }
    
    // Fetch similar movies
    const similarMovies = await getSimilarMovies(movieDetails.id);

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
