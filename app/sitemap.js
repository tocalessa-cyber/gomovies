// app/sitemap.js - VERSI DIPERBAIKI
const BASE_URL = 'https://gomovies123.vercel.app'; // HAPUS SLASH DI AKHIR!

export default async function sitemap() {
  console.log('🎬 Generating dynamic sitemap for Gomovies123...');
  
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
    return getStaticUrls();
  }
}

// 1. STATIC PAGES
async function getStaticUrls() {
  const now = new Date();
  
  return [
    // 🏠 High Priority - Main Pages
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/trending`, lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${BASE_URL}/search`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    
    // 🎬 Movie Categories
    { url: `${BASE_URL}/movie/popular`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/movie/now-playing`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/movie/upcoming`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/movie/top-rated`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    
    // 📺 TV Series Categories
    { url: `${BASE_URL}/tv-show/popular`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/tv-show/airing-today`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/tv-show/on-the-air`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/tv-show/top-rated`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    
    // 👥 People & Rankings
    { url: `${BASE_URL}/people`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/rankings`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    
    // 🗓️ Archives
    ...generateArchiveUrls(),
    
    // 📜 Legal Pages
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/dmca`, lastModified: now, changeFrequency: 'yearly', priority: 0.1 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.1 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: now, changeFrequency: 'yearly', priority: 0.1 },
    { url: `${BASE_URL}/rss`, lastModified: now, changeFrequency: 'daily', priority: 0.5 },
  ];
}

// 2. DYNAMIC PAGES
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
    return [];
  }
}

// 🔧 HELPER FUNCTIONS
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

// ✅ DIPERBAIKI: Gunakan headers seperti di api.js
async function fetchPopularContent(type) {
  try {
    const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const TMDB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
    const TMDB_API_URL = 'https://api.themoviedb.org/3'; // Hardcode, lebih aman
    
    if (!TMDB_API_KEY) {
      console.warn('⚠️ TMDB API key not found, using sample data');
      return generateSampleContent(type);
    }
    
    const endpoint = type === 'movie' ? 'movie/popular' : 'tv/popular';
    
    // ✅ DIPERBAIKI: Gunakan headers dengan authorization
    const headers = {
      'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    };
    
    // ✅ DIPERBAIKI: Gunakan API key di query param DAN headers
    const url = `${TMDB_API_URL}/${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
    
    const response = await fetch(url, {
      headers,
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`${type} fetch failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results?.slice(0, 50) || [];
    
  } catch (error) {
    console.error(`Error fetching ${type}:`, error.message);
    return generateSampleContent(type);
  }
}

// ✅ DIPERBAIKI: Fetch genres dengan headers
async function fetchGenres() {
  try {
    const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const TMDB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
    const TMDB_API_URL = 'https://api.themoviedb.org/3';
    
    if (!TMDB_API_KEY) {
      console.warn('⚠️ TMDB API key not found, using sample genres');
      return getSampleGenres();
    }
    
    const headers = {
      'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    };
    
    const [movieRes, tvRes] = await Promise.all([
      fetch(`${TMDB_API_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en`, {
        headers,
        next: { revalidate: 86400 }
      }),
      fetch(`${TMDB_API_URL}/genre/tv/list?api_key=${TMDB_API_KEY}&language=en`, {
        headers,
        next: { revalidate: 86400 }
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
    return getSampleGenres();
  }
}

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

function generateGenreUrls(genres) {
  const now = new Date();
  const urls = [];
  
  genres.movie.forEach(genre => {
    const slug = createSlug(genre.name);
    urls.push({
      url: `${BASE_URL}/movie/genre/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6
    });
  });
  
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

// ✅ DIPERBAIKI: Slug function yang lebih baik
function createSlug(name, dateString = '') {
  if (!name) return '';
  
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  if (dateString && typeof dateString === 'string') {
    const year = dateString.substring(0, 4);
    if (year && year.length === 4 && !isNaN(parseInt(year))) {
      return `${baseSlug}-${year}`;
    }
  }
  
  return baseSlug;
}

// 🔄 FALLBACK DATA (tidak perlu diubah)
function generateSampleContent(type) {
  const sampleData = type === 'movie' ? sampleMovies : sampleTvShows;
  return sampleData.slice(0, 20);
}

function getSampleGenres() {
  return {
    movie: [
      { id: 28, name: 'Action' }, { id: 12, name: 'Adventure' },
      // ... keep existing genres
    ],
    tv: [
      { id: 10759, name: 'Action & Adventure' },
      // ... keep existing genres
    ]
  };
}

const sampleMovies = [
  // ... keep existing sample movies
];

const sampleTvShows = [
  // ... keep existing sample TV shows
];