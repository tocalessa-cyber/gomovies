// app/Home/page.jsx
import { getTrendingMoviesDaily, getTrendingTvSeriesDaily } from '../../lib/api';
import TrendingClient from './page-client';
import Head from 'next/head';

export default async function TrendingPage() {
  const [trendingMovies, trendingTvSeries] = await Promise.all([
    getTrendingMoviesDaily(1), // Tambahkan parameter page 1
    getTrendingTvSeriesDaily(1) // Tambahkan parameter page 1
  ]);

  return (
    <>
      <Head>
        <title>Daily Trending - Layar Kaca</title>
      </Head>
      <TrendingClient 
        initialMovies={trendingMovies} 
        initialTvSeries={trendingTvSeries} 
      />
    </>
  );
}