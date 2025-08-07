import { useCallback, useState, useEffect } from "react";
import { TMDB_API_KEY } from "@/config";
import { TMDB_API_URL } from "@/config/constants";
import { TMDBFilmData } from "@/types";

export const useFilmData = (filmId?: number) => {
    const [filmData, setFilmData] = useState<TMDBFilmData | null>(null);
    console.log("useFilmData called with filmId:", JSON.stringify(filmData));

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
