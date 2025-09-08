import { notFound } from 'next/navigation';
import { getTvSeriesById, getSimilarTvSeries, searchMoviesAndTv } from '../../../../lib/api'; 
import WatchClient from './WatchClient';

// Utility function to create a slug from a TV show title
const createSlug = (item) => {
  const title = item.name;
  if (!title) return '';
  const baseSlug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
  
  let year = '';
  if (item.first_air_date) {
    year = item.first_air_date.substring(0, 4);
  }
  return `${baseSlug}-${year}`;
};

// ===================================
// MAIN SERVER COMPONENT
// ===================================
// This is a server component that fetches data and passes it to the client component.
export default async function StreamPage({ params }) {
    const { slug } = await params;

    let tvDetails = null;
    const id = parseInt(slug, 10);
  
    // Separate the slug into title and year, if a year exists
    const slugParts = slug.split('-');
    const lastPart = slugParts[slugParts.length - 1];
    const slugYear = /^\d{4}$/.test(lastPart) ? lastPart : null;
    const slugTitle = slugYear ? slugParts.slice(0, -1).join('-') : slug;
  
    // Check if the slug is a numeric ID
    if (!isNaN(id) && slugParts.length === 1) {
      tvDetails = await getTvSeriesById(id);
    } else {
      // Search for the TV show based on the title part of the slug
      const searchResults = await searchMoviesAndTv(slugTitle.replace(/-/g, ' '));
      
      let matchingTvShow = searchResults.find(item => {
        const itemTitle = item.name?.toLowerCase().replace(/[^a-z0-9\s]/g, '');
        if (!itemTitle) {
          return false;
        }
  
        const slugTitleClean = slugTitle.toLowerCase().replace(/-/g, '').replace(/[^a-z0-9\s]/g, '');
  
        const titleMatch = itemTitle === slugTitleClean ||
                           itemTitle.replace(/\s/g, '') === slugTitleClean;
  
        const yearMatch = !slugYear || (item.first_air_date && item.first_air_date.substring(0, 4) === slugYear);
        
        return item.media_type === 'tv' && titleMatch && yearMatch;
      });
  
      if (matchingTvShow) {
        tvDetails = await getTvSeriesById(matchingTvShow.id);
      }
    }

    // If TV show details are still not found, show a 404 page
    if (!tvDetails) {
        notFound();
    }
    
    // Fetch similar TV shows
    const similarTvShows = await getSimilarTvSeries(tvDetails.id);

    // Pass the fetched data as props to the client component
    return (
        <WatchClient
            mediaType="tv-show"
            id={tvDetails.id}
            initialDetails={tvDetails}
            initialSimilarMedia={similarTvShows}
        />
    );
}
