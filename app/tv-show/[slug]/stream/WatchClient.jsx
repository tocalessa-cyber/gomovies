'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlayCircleIcon } from 'lucide-react';
import { notFound } from 'next/navigation';

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Component to display a movie/TV show card
function MovieCard({ media }) {
    if (!media) {
        return null;
    }

    const POSTER_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
    const mediaType = media.media_type || 'movie';
    const mediaTitle = media.title || media.name;

    const posterPath = media.poster_path && media.poster_path !== ""
        ? `${POSTER_IMAGE_URL}${media.poster_path}`
        : 'https://placehold.co/500x750?text=No+Image';

    const targetUrl = `/${mediaType}/${media.id}`;

    return (
        <Link href={targetUrl} passHref>
            <div className="relative group rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 transform hover:scale-105 hover:shadow-blue-600/50 cursor-pointer">
                <Image
                    src={posterPath}
                    alt={mediaTitle}
                    width={500}
                    height={750}
                    className="w-full h-auto object-cover rounded-xl"
                    unoptimized // Fix: Added unoptimized for the placeholder image
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-sm md:text-lg font-bold text-white mb-2 truncate">
                        {mediaTitle}
                    </h3>
                    {media.release_date && (
                        <span className="text-xs md:text-sm text-gray-400">
                            ({media.release_date.substring(0, 4)})
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

// ===================================
// MAIN CLIENT COMPONENT
// ===================================
export default function WatchClient({ mediaType, id, initialDetails, initialSimilarMedia }) {
    // Check if initial data is valid. If not, return a not found message.
    if (!initialDetails || !initialSimilarMedia) {
        // This should ideally be handled by the server component, but this is a fallback.
        return notFound();
    }

    const [details] = useState(initialDetails);
    const [similarMedia] = useState(initialSimilarMedia);
    const [streamUrl, setStreamUrl] = useState(null);

    const title = details.title || details.name;

    // Fungsi untuk mendapatkan URL streaming dari Vidsrc
    const getVidsrcUrl = (source) => {
        const vidsrcBaseUrl = source === 'vidsrc.me' ? 'https://vidsrc.me/embed/' : 'https://vidsrc.to/embed/movie/';
        return `${vidsrcBaseUrl}${id}`;
    };

    // Handler to select the stream source
    const handleStreamSelect = (source) => {
        setStreamUrl(getVidsrcUrl(source));
    };

    return (
        <main className="bg-gray-950 text-white min-h-screen font-sans">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Media Poster */}
                    <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4 rounded-xl overflow-hidden shadow-2xl">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                            alt={title}
                            width={500}
                            height={750}
                            className="w-full h-auto object-cover"
                            unoptimized // Fix: Added unoptimized
                        />
                    </div>

                    {/* Media Details */}
                    <div className="flex-grow">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-cyan-400">
                            {title}
                        </h1>
                        <p className="text-gray-300 text-lg mb-4">
                            {details.overview || 'Synopsis not available.'}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
                            <span>Year: {details.release_date ? details.release_date.substring(0, 4) : 'N/A'}</span>
                            <span>Rating: {details.vote_average ? details.vote_average.toFixed(1) : 'N/A'} / 10</span>
                        </div>
                    </div>
                </div>

                {/* Video Player Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Select Streaming Source</h2>
                    <div className="flex flex-wrap gap-4 mb-8">
                        {/* Dummy streaming buttons. Replace with real sources. */}
                        <button
                            onClick={() => handleStreamSelect('vidsrc.me')}
                            className="bg-blue-600 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-md"
                        >
                            Stream 1
                        </button>
                        <button
                            onClick={() => handleStreamSelect('vidsrc.to')}
                            className="bg-blue-600 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-md"
                        >
                            Stream 2
                        </button>
                    </div>

                    <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                        <div className="w-full h-full">
                            {streamUrl ? (
                                <iframe
                                    src={streamUrl}
                                    title={`${title} Player`}
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full border-0"
                                ></iframe>
                            ) : (
                                <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full text-gray-400 bg-gray-900">
                                    <PlayCircleIcon size={64} className="mb-4 text-gray-600" />
                                    Select one button of Stream 1 or Stream 2
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* "You might also like" section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {similarMedia.map((media) => (
                            <MovieCard key={media.id} media={media} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
