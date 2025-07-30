import { useCallback, useState, useEffect } from "react";
import { TMDB_API_KEY } from "@/config";
import { TMDB_API_URL } from "@/config/constants";

export const useFilmModal = (filmId?: number) => {
    const [filmData, setFilmData] = useState<any>();

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
