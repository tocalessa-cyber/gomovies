import { notFound } from 'next/navigation';
import { getTvSeriesById, getSimilarTvSeries, getTvSeriesByTitle } from '../../../../lib/api';
import WatchClient from './WatchClient.jsx';

// ===================================
// MAIN SERVER COMPONENT
// ===================================
// This is a server component that fetches data and passes it to the client component.
export default async function StreamPage({ params }) {
    const { slug } = await params;

    let id = parseInt(slug.split('-').pop(), 10);
    let tvDetails = null;

    // First, try to get the TV show ID from the end of the slug
    if (!isNaN(id)) {
        tvDetails = await getTvSeriesById(id);
    }
    
    // If TV show details were not found using the ID, or if the slug didn't have an ID,
    // try to get the TV show by its title.
    if (!tvDetails) {
        const titleSlug = slug.replace(/-\d+$/, ''); // Remove ID from slug if it exists
        const searchResults = await getTvSeriesByTitle(titleSlug);
        if (searchResults && searchResults.length > 0) {
            id = searchResults[0].id;
            tvDetails = await getTvSeriesById(id);
        }
    }

    // If TV show details are still not found, show a 404 page
    if (!tvDetails) {
        notFound();
    }

    // Fetch similar TV shows
    const similarTvShows = await getSimilarTvSeries(id);

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
