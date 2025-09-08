const API_URL = 'https://tmdb-api-proxy.musadekakhmad.workers.dev';

// Function to get a movie by its ID
export async function getMovieById(movieId) {
  try {
    const res = await fetch(`${API_URL}/movie/${movieId}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch movie with ID: ${movieId}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    return null;
  }
}

// Function to get a TV series by its ID
export async function getTvSeriesById(tvId) {
  try {
    const res = await fetch(`${API_URL}/tv/${tvId}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch TV series with ID: ${tvId}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching TV series details for ID ${tvId}:`, error);
    return null;
  }
}

// Function to get movie videos (trailers)
export async function getMovieVideos(movieId) {
  try {
    const res = await fetch(`${API_URL}/movie/${movieId}/videos`);
    if (!res.ok) {
      throw new Error(`Failed to fetch movie videos for ID: ${movieId}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching movie videos for ID ${movieId}:`, error);
    return [];
  }
}

// Function to get TV series videos (trailers)
export async function getTvSeriesVideos(tvId) {
  try {
    const res = await fetch(`${API_URL}/tv/${tvId}/videos`);
    if (!res.ok) {
      throw new Error(`Failed to fetch TV series videos for ID: ${tvId}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching TV series videos for ID ${tvId}:`, error);
    return [];
  }
}

// Function to get similar movies
export async function getSimilarMovies(movieId) {
  try {
    const res = await fetch(`${API_URL}/movie/${movieId}/similar`);
    if (!res.ok) {
      throw new Error(`Failed to fetch similar movies for ID: ${movieId}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching similar movies for ID ${movieId}:`, error);
    return [];
  }
}

// Function to get similar TV series
export async function getSimilarTvSeries(tvId) {
  try {
    const res = await fetch(`${API_URL}/tv/${tvId}/similar`);
    if (!res.ok) {
      throw new Error(`Failed to fetch similar TV series for ID: ${tvId}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching similar TV series for ID ${tvId}:`, error);
    return [];
  }
}

// Function to search for movies and TV series
export async function searchMoviesAndTv(query) {
  try {
    const res = await fetch(`${API_URL}/search/multi?query=${encodeURIComponent(query)}`);
    if (!res.ok) {
      throw new Error('Failed to search');
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error('Error searching:', error);
    return [];
  }
}

// Function to get movies by category
export async function getMoviesByCategory(category, page = 1) {
  try {
    const res = await fetch(`${API_URL}/movie/${category}?page=${page}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${category} movies`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching movies by category: ${category}`, error);
    return [];
  }
}

// Function to get TV series by category
export async function getTvSeriesByCategory(category, page = 1) {
  try {
    const res = await fetch(`${API_URL}/tv/${category}?page=${page}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${category} TV series`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching TV series by category: ${category}`, error);
    return [];
  }
}

// Function to get a movie by its title
export const getMovieByTitle = async (title) => {
    try {
        // Use the search endpoint with the 'query' parameter
        const response = await fetch(`${API_URL}/search/movie?query=${encodeURIComponent(title)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        // Return the most relevant search result
        return data.results && data.results.length > 0 ? data.results : null;
    } catch (error) {
        console.error(`Error fetching movie by title: ${title}`, error);
        return null;
    }
};

// Function to get a TV series by its title
export const getTvSeriesByTitle = async (title) => {
  try {
    const response = await fetch(`${API_URL}/search/tv?query=${encodeURIComponent(title)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch TV series details');
    }
    const data = await response.json();
    return data.results && data.results.length > 0 ? data.results : null;
  } catch (error) {
    console.error(`Error fetching TV series by title: ${title}`, error);
    return null;
  }
};
