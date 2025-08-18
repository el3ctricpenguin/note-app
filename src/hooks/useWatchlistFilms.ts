import { useEffect, useState } from "react";
import { fetchJsonWithAuth } from "@/lib/fetchWithAuth";
import { Watchlist } from "@prisma/client";

export const useWatchlistFilms = () => {
    const [watchlistFilms, setWatchlistFilms] = useState<Watchlist[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchWatchlist = async () => {
        try {
            setIsLoading(true);
            const watchlistFilms = await fetchJsonWithAuth<Watchlist[]>(`/api/film/watchlist`);
            setWatchlistFilms(watchlistFilms);
        } catch (error) {
            console.error("Failed to fetch watchlist:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWatchlist();
    }, []);

    return {
        watchlistFilms,
        isLoading,
        refetch: fetchWatchlist,
    };
};