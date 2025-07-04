export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async ({query}: {query: string}) =>{
    const endpoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
                                    `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if(!response.ok) {
        // @ts-ignore
        throw new Error('Something went wrong', response.statusText);
    }
    const data = await response.json();
    return data.results;

}

export const fetchMovieDetails = async (movieId: string) : Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if(!response.ok) {
            throw new Error("Faild to fetch movie details");
        }
        const data = await response.json();
        return data;

    }catch (error) {
        console.log(error);
        throw error;
    }


}
export async function fetchYtsTorrent(title: string) {
    console.log("🌐 Searching YTS for:", title);

    try {
        const res = await fetch(`https://tor-stream-api.onrender.com/yts?title=${encodeURIComponent(title)}`);
        const json = await res.json();

        if (!json?.data?.movies?.[0]?.torrents?.[0]?.url) {
            console.warn("⚠️ No torrent found for:", title);
            return null;
        }

        return json.data.movies[0].torrents[0].url; // .torrent file URL
    } catch (error) {
        console.error("❌ fetchYtsTorrent failed:", error);
        return null;
    }
}


