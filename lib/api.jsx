const API_URL = 'https://tmdb-api-proxy.musadekakhmad.workers.dev';

// Fungsi untuk mendapatkan film berdasarkan ID
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

// Fungsi untuk mendapatkan serial TV berdasarkan ID
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

// Fungsi untuk mendapatkan video (trailer) film
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

// Fungsi untuk mendapatkan video (trailer) serial TV
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

// Fungsi untuk mendapatkan kredit (aktor dan kru) film
export async function getMovieCredits(movieId) {
  try {
    const res = await fetch(`${API_URL}/movie/${movieId}/credits`);
    if (!res.ok) {
      throw new Error(`Failed to fetch movie credits for ID: ${movieId}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching movie credits for ID ${movieId}:`, error);
    return null;
  }
}

// Fungsi untuk mendapatkan ulasan film
export async function getMovieReviews(movieId) {
  try {
    const res = await fetch(`${API_URL}/movie/${movieId}/reviews`);
    if (!res.ok) {
      throw new Error(`Failed to fetch movie reviews for ID: ${movieId}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching movie reviews for ID ${movieId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan kredit (aktor dan kru) serial TV
export async function getTvSeriesCredits(tvId) {
  try {
    const res = await fetch(`${API_URL}/tv/${tvId}/credits`);
    if (!res.ok) {
      throw new Error(`Failed to fetch TV series credits for ID: ${tvId}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching TV series credits for ID ${tvId}:`, error);
    return null;
  }
}

// Fungsi untuk mendapatkan ulasan serial TV
export async function getTvSeriesReviews(tvId) {
  try {
    const res = await fetch(`${API_URL}/tv/${tvId}/reviews`);
    if (!res.ok) {
      throw new Error(`Failed to fetch TV series reviews for ID: ${tvId}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching TV series reviews for ID ${tvId}:`, error);
    return [];
  }
}

// Fungsi untuk mencari film atau serial TV berdasarkan query
export async function searchMoviesAndTv(query) {
  try {
    const res = await fetch(`${API_URL}/search/multi?query=${encodeURIComponent(query)}`);
    if (!res.ok) {
      throw new Error('Failed to fetch search results');
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching search results for query '${query}':`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan film berdasarkan kategori
export async function getMoviesByCategory(category, page = 1) {
  try {
    const res = await fetch(`${API_URL}/movie/${category}?page=${page}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${category} movies`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan serial TV berdasarkan kategori
export async function getTvSeriesByCategory(category, page = 1) {
  try {
    const res = await fetch(`${API_URL}/tv/${category}?page=${page}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${category} TV series`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${category} TV series:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan film serupa
export async function getSimilarMovies(movieId) {
  try {
    const res = await fetch(`${API_URL}/movie/${movieId}/similar`);
    if (!res.ok) {
      throw new Error(`Failed to fetch similar movies for ID: ${movieId}`);
    }
    const data = await res.json();
    // PERBAIKAN: Mengembalikan array 'results' dari respons
    return data.results;
  } catch (error) {
    console.error(`Error fetching similar movies for ID ${movieId}:`, error);
    // PERBAIKAN: Mengembalikan array kosong jika ada error
    return [];
  }
}

// Fungsi untuk mendapatkan serial TV serupa
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

// Fungsi untuk mencari film berdasarkan judul
export const getMovieByTitle = async (title) => {
    try {
        // Menggunakan endpoint pencarian dengan parameter 'query'
        const response = await fetch(`${API_URL}/search/movie?query=${encodeURIComponent(title)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        // Mengembalikan hasil pencarian yang paling relevan
        return data.results && data.results.length > 0 ? data.results : null;
    } catch (error) {
        console.error(`Error fetching movie by title: ${title}`, error);
        return null;
    }
};

// Fungsi untuk mencari serial TV berdasarkan judul
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
