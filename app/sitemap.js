// app/sitemap.js - VERSI DINAMIS DENGAN ENV VARIABLES - FIXED
const BASE_URL = 'https://soap2day-hd.vercel.app/';

export default async function sitemap() {
  console.log('🎬 Generating dynamic sitemap for Soap2day...');
  
  try {
    const [staticUrls, dynamicUrls] = await Promise.all([
      getStaticUrls(),
      getDynamicUrls()
    ]);

    const allUrls = [...staticUrls, ...dynamicUrls];
    
    console.log(`✅ Sitemap generated: ${allUrls.length} URLs total`);
    console.log(`📊 Breakdown: ${staticUrls.length} static, ${dynamicUrls.length} dynamic`);
    
    return allUrls;

  } catch (error) {
    console.error('❌ Sitemap generation error, using fallback:', error.message);
    return getStaticUrls(); // Fallback ke static URLs
  }
}

// 1. STATIC PAGES (Halaman utama & kategori)
async function getStaticUrls() {
  const now = new Date();
  
  return [
    // 🏠 High Priority - Main Pages
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/trending`, lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${BASE_URL}/search`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    
    // 🎬 Movie Categories (sesuai navbar)
    { url: `${BASE_URL}/movie/popular`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/movie/now-playing`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/movie/upcoming`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/movie/top-rated`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    
    // 📺 TV Series Categories (sesuai navbar)
    { url: `${BASE_URL}/tv-show/popular`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/tv-show/airing-today`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/tv-show/on-the-air`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/tv-show/top-rated`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    
    // 👥 People & Rankings
    { url: `${BASE_URL}/people`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/rankings`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    
    // 🗓️ Archives (sesuai navbar)
    ...generateArchiveUrls(),
    
    // 📜 Legal Pages
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/dmca`, lastModified: now, changeFrequency: 'yearly', priority: 0.1 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.1 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: now, changeFrequency: 'yearly', priority: 0.1 },
    { url: `${BASE_URL}/rss`, lastModified: now, changeFrequency: 'daily', priority: 0.5 },
  ];
}

// 2. DYNAMIC PAGES (Movie & TV Show detail pages)
async function getDynamicUrls() {
  try {
    console.log('🔄 Fetching dynamic content for sitemap...');
    
    const [movies, tvShows, genres] = await Promise.all([
      fetchPopularContent('movie'),
      fetchPopularContent('tv'),
      fetchGenres()
    ]);

    const dynamicUrls = [
      // 🎬 Movie Detail Pages
      ...movies.map(item => generateContentUrls(item, 'movie')),
      
      // 📺 TV Show Detail Pages  
      ...tvShows.map(item => generateContentUrls(item, 'tv-show')),
      
      // 🎭 Genre Pages
      ...generateGenreUrls(genres)
    ].flat();

    console.log(`🎯 Generated: ${movies.length} movies, ${tvShows.length} TV shows, ${genres.movie.length + genres.tv.length} genres`);
    
    return dynamicUrls;

  } catch (error) {
    console.error('⚠️ Dynamic content fetch failed:', error.message);
    return []; // Return empty array instead of failing
  }
}

// 🔧 HELPER FUNCTIONS

// Generate archive URLs berdasarkan struktur navbar
function generateArchiveUrls() {
  const now = new Date();
  const currentYear = new Date().getFullYear();
  const recentYears = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const decades = ['2020s', '2010s', '2000s', '1990s', '1980s'];
  
  const yearUrls = recentYears.map(year => ({
    url: `${BASE_URL}/movie/year/${year}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6
  }));
  
  const decadeUrls = decades.map(decade => ({
    url: `${BASE_URL}/movie/decade/${decade.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5
  }));
  
  return [...yearUrls, ...decadeUrls];
}

// Fetch popular content dari TMDB API menggunakan env variables - FIXED
async function fetchPopularContent(type) {
  try {
    const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const TMDB_API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
    
    if (!TMDB_API_KEY || !TMDB_API_URL) {
      console.warn('⚠️ TMDB environment variables not found, using sample data');
      return generateSampleContent(type);
    }
    
    const endpoint = type === 'movie' ? 'movie/popular' : 'tv/popular';
    // PERBAIKAN: Gunakan API key di query parameter seperti di api.js
    const url = `${TMDB_API_URL}/${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
    
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache 1 jam
    });
    
    if (!response.ok) {
      throw new Error(`${type} fetch failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results?.slice(0, 50) || []; // Limit to 50 items
    
  } catch (error) {
    console.error(`Error fetching ${type}:`, error.message);
    return generateSampleContent(type); // Fallback ke sample data
  }
}

// Fetch genres dari TMDB menggunakan env variables - FIXED
async function fetchGenres() {
  try {
    const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const TMDB_API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
    
    if (!TMDB_API_KEY || !TMDB_API_URL) {
      console.warn('⚠️ TMDB environment variables not found, using sample genres');
      return getSampleGenres();
    }
    
    // PERBAIKAN: Gunakan API key di query parameter seperti di api.js
    const [movieRes, tvRes] = await Promise.all([
      fetch(`${TMDB_API_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en`, {
        next: { revalidate: 86400 } // Cache 24 jam
      }),
      fetch(`${TMDB_API_URL}/genre/tv/list?api_key=${TMDB_API_KEY}&language=en`, {
        next: { revalidate: 86400 } // Cache 24 jam
      })
    ]);
    
    if (!movieRes.ok || !tvRes.ok) {
      throw new Error(`Genres fetch failed: ${movieRes.status}, ${tvRes.status}`);
    }
    
    const movieData = await movieRes.json();
    const tvData = await tvRes.json();
    
    return {
      movie: movieData.genres || [],
      tv: tvData.genres || []
    };
    
  } catch (error) {
    console.error('Error fetching genres:', error.message);
    return getSampleGenres(); // Fallback ke sample genres
  }
}

// Generate URLs untuk movie/tv show detail dan stream pages
function generateContentUrls(item, type) {
  const slug = createSlug(type === 'movie' ? item.title : item.name, 
                         type === 'movie' ? item.release_date : item.first_air_date);
  
  const urls = [
    {
      url: `${BASE_URL}/${type}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    }
  ];
  
  // Tambahkan stream page untuk content yang tersedia
  if (item.id) {
    urls.push({
      url: `${BASE_URL}/${type}/${slug}/stream`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    });
  }
  
  return urls;
}

// Generate genre pages URLs
function generateGenreUrls(genres) {
  const now = new Date();
  const urls = [];
  
  // Movie genres
  genres.movie.forEach(genre => {
    const slug = createSlug(genre.name);
    urls.push({
      url: `${BASE_URL}/movie/genre/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6
    });
  });
  
  // TV genres
  genres.tv.forEach(genre => {
    const slug = createSlug(genre.name);
    urls.push({
      url: `${BASE_URL}/tv-show/genre/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6
    });
  });
  
  return urls;
}

// Utility function untuk create slug (sama dengan yang di navbar)
function createSlug(name, dateString = '') {
  if (!name) return '';
  
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();

  // Tambahkan tahun jika ada
  if (dateString && typeof dateString === 'string') {
    const year = dateString.substring(0, 4);
    if (year && year.length === 4 && !isNaN(parseInt(year))) {
      return `${baseSlug}-${year}`;
    }
  }
  
  return baseSlug;
}

// 🔄 FALLBACK DATA (jika API gagal)

function generateSampleContent(type) {
  const sampleData = type === 'movie' ? sampleMovies : sampleTvShows;
  return sampleData.slice(0, 20); // Return 20 sample items
}

function getSampleGenres() {
  return {
    movie: [
      { id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 16, name: 'Animation' },
      { id: 35, name: 'Comedy' }, { id: 80, name: 'Crime' }, { id: 99, name: 'Documentary' },
      { id: 18, name: 'Drama' }, { id: 10751, name: 'Family' }, { id: 14, name: 'Fantasy' },
      { id: 36, name: 'History' }, { id: 27, name: 'Horror' }, { id: 10402, name: 'Music' },
      { id: 9648, name: 'Mystery' }, { id: 10749, name: 'Romance' }, { id: 878, name: 'Science Fiction' },
      { id: 10770, name: 'TV Movie' }, { id: 53, name: 'Thriller' }, { id: 10752, name: 'War' },
      { id: 37, name: 'Western' }
    ],
    tv: [
      { id: 10759, name: 'Action & Adventure' }, { id: 16, name: 'Animation' }, { id: 35, name: 'Comedy' },
      { id: 80, name: 'Crime' }, { id: 99, name: 'Documentary' }, { id: 18, name: 'Drama' },
      { id: 10751, name: 'Family' }, { id: 10762, name: 'Kids' }, { id: 9648, name: 'Mystery' },
      { id: 10763, name: 'News' }, { id: 10764, name: 'Reality' }, { id: 10765, name: 'Sci-Fi & Fantasy' },
      { id: 10766, name: 'Soap' }, { id: 10767, name: 'Talk' }, { id: 10768, name: 'War & Politics' },
      { id: 37, name: 'Western' }
    ]
  };
}

const sampleMovies = [
  { id: 1, title: 'Avatar', release_date: '2009-12-18' },
  { id: 2, title: 'Avengers: Endgame', release_date: '2019-04-26' },
  { id: 3, title: 'The Dark Knight', release_date: '2008-07-18' },
  { id: 4, title: 'Inception', release_date: '2010-07-16' },
  { id: 5, title: 'Spider-Man: No Way Home', release_date: '2021-12-17' },
  { id: 6, title: 'Jurassic World', release_date: '2015-06-12' },
  { id: 7, title: 'The Lion King', release_date: '2019-07-19' },
  { id: 8, title: 'Frozen II', release_date: '2019-11-22' },
  { id: 9, title: 'Black Panther', release_date: '2018-02-16' },
  { id: 10, title: 'Harry Potter and the Philosopher\'s Stone', release_date: '2001-11-16' }
];

const sampleTvShows = [
  { id: 1, name: 'Game of Thrones', first_air_date: '2011-04-17' },
  { id: 2, name: 'Breaking Bad', first_air_date: '2008-01-20' },
  { id: 3, name: 'Stranger Things', first_air_date: '2016-07-15' },
  { id: 4, name: 'The Mandalorian', first_air_date: '2019-11-12' },
  { id: 5, name: 'Friends', first_air_date: '1994-09-22' },
  { id: 6, name: 'The Witcher', first_air_date: '2019-12-20' },
  { id: 7, name: 'Lucifer', first_air_date: '2016-01-25' },
  { id: 8, name: 'The Boys', first_air_date: '2019-07-26' },
  { id: 9, name: 'Money Heist', first_air_date: '2017-05-02' },
  { id: 10, name: 'Squid Game', first_air_date: '2021-09-17' }
];