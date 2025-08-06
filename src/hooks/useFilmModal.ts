import { useCallback, useState, useEffect } from "react";
import { TMDB_API_KEY } from "@/config";
import { TMDB_API_URL } from "@/config/constants";

interface TMDBFilmData {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    genres: { id: number; name: string }[];
    vote_average: number;
    vote_count: number;
}

export const useFilmModal = (filmId?: number) => {
    const [filmData, setFilmData] = useState<TMDBFilmData | null>(null);

    const fetchFilmData = useCallback(async (id: number) => {
        const response = await fetch(`${TMDB_API_URL}/movie/${id}?language=en-US&api_key=${TMDB_API_KEY}`, { method: "GET" });
        const data = await response.json();
        setFilmData(data);
    }, []);

    useEffect(() => {
        if (filmId) {
            fetchFilmData(filmId);
        }
    }, [filmId, fetchFilmData]);

    return {
        filmData,
    };
};
