// app/Home/page.jsx
import { getTrendingMoviesDaily, getTrendingTvSeriesDaily } from '../../lib/api';
import TrendingClient from './page-client';
import Head from 'next/head';

// Tambahkan ini untuk membuat halaman dynamic
export const dynamic = 'force-dynamic';
// atau gunakan revalidate dengan nilai > 0
// export const revalidate = 3600; // Cache 1 jam

export default async function TrendingPage() {
  let trendingMovies = [];
  let trendingTvSeries = [];

  try {
    [trendingMovies, trendingTvSeries] = await Promise.all([
      getTrendingMoviesDaily(1),
      getTrendingTvSeriesDaily(1)
    ]);
  } catch (error) {
    console.error('Error fetching initial data:', error);
    // Tetap render dengan data kosong jika error
  }

  return (
    <>
      <Head>
        <title>Daily Trending - Gomovies123</title>
      </Head>
      <TrendingClient 
        initialMovies={trendingMovies} 
        initialTvSeries={trendingTvSeries} 
      />
    </>
  );
}