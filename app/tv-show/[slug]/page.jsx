import { notFound } from 'next/navigation';
import Image from 'next/image';
import { FaYoutube, FaUserCircle, FaStar, FaInfoCircle } from 'react-icons/fa';
import {
  getTvSeriesById,
  getTvSeriesVideos,
  getTvSeriesCredits,
  getTvSeriesReviews,
  searchMoviesAndTv,
  getSimilarTvSeries,
} from '../../../lib/api';

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

// generateMetadata function for SEO and OG tags
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  let tvShowData = null;
  const id = parseInt(slug, 10);

  const slugParts = slug.split('-');
  const lastPart = slugParts[slugParts.length - 1];
  const slugYear = /^\d{4}$/.test(lastPart) ? lastPart : null;
  const slugTitle = slugYear ? slugParts.slice(0, -1).join('-') : slug;

  // Check if the slug is an ID
  if (!isNaN(id) && slugParts.length === 1) {
    tvShowData = await getTvSeriesById(id);
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
      tvShowData = await getTvSeriesById(matchingTvShow.id);
    }
  }

  // If TV show details are still not found, show a 404 page
  if (!tvShowData) {
      notFound();
  }

  // Generate metadata for the TV show
  return {
    title: `${tvShowData.name} (${tvShowData.first_air_date.substring(0, 4)}) - Stream and Watch`,
    description: tvShowData.overview || `Watch and stream the TV show ${tvShowData.name} from ${tvShowData.first_air_date.substring(0, 4)}.`,
    openGraph: {
      title: `${tvShowData.name} (${tvShowData.first_air_date.substring(0, 4)})`,
      description: tvShowData.overview,
      images: [
        {
          url: `https://image.tmdb.org/t/p/original${tvShowData.poster_path}`,
          alt: tvShowData.name,
        },
      ],
      type: 'video.tv_show',
    },
  };
}

// ===================================
// MAIN SERVER COMPONENT
// ===================================
// This is a server component that fetches data and passes it to the client component.
export default async function TVShowPage({ params }) {
  const { slug } = await params;
  
  let tvDetails = null;
  const id = parseInt(slug, 10);
  
  // Separate the slug into title and year, if a year exists
  const slugParts = slug.split('-');
  const lastPart = slugParts[slugParts.length - 1];
  const slugYear = /^\d{4}$/.test(lastPart) ? lastPart : null;
  const slugTitle = slugYear ? slugParts.slice(0, -1).join('-') : slug;

  // Check if the slug is a number
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

  // Fetch videos, cast, and reviews
  const videos = await getTvSeriesVideos(tvDetails.id);
  const credits = await getTvSeriesCredits(tvDetails.id);
  const reviews = await getTvSeriesReviews(tvDetails.id);

  const officialTrailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  const cast = credits.cast.slice(0, 10); // Take the first 10 cast members
  const director = credits.crew.find(person => person.job === 'Director');

  const posterImageUrl = tvDetails.poster_path
    ? `https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`
    : 'https://placehold.co/500x750?text=No+Image';
    
  const backdropImageUrl = tvDetails.backdrop_path
    ? `https://image.tmdb.org/t/p/original${tvDetails.backdrop_path}`
    : null;

  const getFullImageUrl = (path) => {
    return path ? `https://image.tmdb.org/t/p/original${path}` : 'https://placehold.co/500x750?text=No+Image';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${backdropImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-48">
        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Poster Image */}
          <div className="w-48 md:w-64 flex-shrink-0 relative rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
            <Image
              src={posterImageUrl}
              alt={tvDetails.name}
              width={500}
              height={750}
              className="w-full h-auto object-cover"
              unoptimized={!tvDetails.poster_path}
            />
          </div>
          
          {/* Details Section */}
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mt-4 md:mt-0">
              {tvDetails.name}
            </h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base italic">
              {tvDetails.tagline}
            </p>
            
            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
              {officialTrailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${officialTrailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full flex items-center transition-transform transform hover:scale-105"
                >
                  <FaYoutube className="mr-2" /> Watch Trailer
                </a>
              )}
              {tvDetails.homepage && (
                <a
                  href={tvDetails.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-full flex items-center transition-transform transform hover:scale-105"
                >
                  <FaInfoCircle className="mr-2" /> More Info
                </a>
              )}
            </div>

            {/* TV Show Information */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Overview</h2>
                <p className="text-gray-300 text-sm md:text-base">{tvDetails.overview}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold">Release Date</h3>
                  <p className="text-gray-300">{tvDetails.first_air_date}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Rating</h3>
                  <div className="flex items-center space-x-2">
                    <FaStar className="text-yellow-400" />
                    <span className="text-gray-300 font-semibold">
                      {tvDetails.vote_average.toFixed(1)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({tvDetails.vote_count} votes)
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Genres</h3>
                  <p className="text-gray-300">
                    {tvDetails.genres.map((genre) => genre.name).join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cast and Reviews Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Cast */}
          {cast.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Top Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {cast.map(person => (
                  <div key={person.id} className="text-center">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-2 relative">
                      {person.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                          alt={person.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                          <FaUserCircle className="text-gray-400 text-4xl" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-semibold truncate">{person.name}</p>
                    <p className="text-xs text-gray-400 truncate">{person.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {reviews.results.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">User Reviews</h2>
              <div className="space-y-4">
                {reviews.results.slice(0, 3).map(review => (
                  <div key={review.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="flex items-center space-x-3 mb-2">
                      <FaUserCircle className="text-gray-400 text-xl" />
                      <span className="font-semibold">{review.author}</span>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-4">
                      {review.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Similar TV Shows Section */}
        {similarTvShows.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar TV Shows</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {similarTvShows.map(item => {
                const itemSlug = createSlug(item);
                const fullImageUrl = getFullImageUrl(item.poster_path);
                return (
                  <a key={item.id} href={`/tv-show/${itemSlug}`}>
                    <div className="relative rounded-xl overflow-hidden shadow-md transition-transform duration-300 transform hover:scale-105 group">
                      <Image
                        src={fullImageUrl}
                        alt={item.name}
                        width={200}
                        height={300}
                        className="w-full h-auto object-cover rounded-lg"
                        unoptimized={!item.poster_path}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-xs md:text-sm font-semibold text-white truncate mb-1">
                          {item.name}
                        </h3>
                        {item.first_air_date && (
                          <span className="text-[10px] md:text-xs text-gray-400">
                            ({item.first_air_date.substring(0, 4)})
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
		
		{/* Bottom Streaming Button */}
        <div className="mt-12 text-center">
             <a href={`/tv-show/${slug}/stream`}>
              <button className="bg-blue-600 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg">
                🎬 Stream Now
              </button>
            </a>
        </div>
      </div>
    </div>
  );
}
