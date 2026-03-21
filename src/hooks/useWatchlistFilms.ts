import { useEffect, useState } from "react";
import { fetchWithAuth, fetchJsonWithAuth } from "@/lib/fetchWithAuth";
import { Watchlist } from "@prisma/client";
import { useToasts } from "@/hooks/useToasts";

export const useWatchlistFilms = () => {
    const [watchlistFilms, setWatchlistFilms] = useState<Watchlist[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { showSuccessToast, showErrorToast } = useToasts();

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

    const deleteWatchlistFilm = async (id: number) => {
        try {
            const response = await fetchWithAuth(`/api/film/watchlist/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete");
            showSuccessToast("映画を削除しました");
            await fetchWatchlist();
        } catch (error) {
            console.error("Failed to delete watchlist film:", error);
            showErrorToast("削除に失敗しました");
        }
    };

    return {
        watchlistFilms,
        isLoading,
        refetch: fetchWatchlist,
        deleteWatchlistFilm,
    };
};
