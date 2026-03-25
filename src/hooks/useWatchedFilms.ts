import { useEffect, useState } from "react";
import { fetchWithAuth, fetchJsonWithAuth } from "@/lib/fetchWithAuth";
import { GroupedFilms } from "@/types";
import { useToasts } from "@/hooks/useToasts";
import dayjs from "dayjs";

export const useWatchedFilms = () => {
    const [watchedFilmsByDate, setWatchedFilms] = useState<GroupedFilms>({});
    const [isLoading, setIsLoading] = useState(true);
    const { showSuccessToast, showErrorToast } = useToasts();

    const fetchWatchedFilms = async () => {
        try {
            setIsLoading(true);
            const watchedFilms = await fetchJsonWithAuth<GroupedFilms>(`/api/film/watched/by-date`);
            setWatchedFilms(watchedFilms);
        } catch (error) {
            console.error("Failed to fetch watched films:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWatchedFilms();
    }, []);

    // {"2024-01-01": [...], "2024-01-02": [...]} → {"2024": {"2024-01-01": [...], "2024-01-02": [...]}, "2023": {...}}
    const filmsByYearAndDate = Object.entries(watchedFilmsByDate).reduce(
        (acc, [date, films]) => {
            const year = dayjs(date).year().toString();
            return {
                ...acc,
                [year]: { ...acc[year], [date]: films },
            };
        },
        {} as { [year: string]: { [date: string]: any[] } },
    );

    // {"2024": {...}} → [{year: "2024", dateGroups: [{date: "2024-01-01", films: [...]}]}]
    const watchedFilmsByYear = Object.entries(filmsByYearAndDate)
        .sort(([a], [b]) => parseInt(b) - parseInt(a)) // 年を降順ソート
        .map(([year, dateGroups]) => ({
            year,
            dateGroups: Object.entries(dateGroups)
                .sort(([a], [b]) => dayjs(b).valueOf() - dayjs(a).valueOf()) // 日付を降順ソート
                .map(([date, films]) => ({ date, films })),
        }));

    const deleteWatchedFilm = async (id: number) => {
        try {
            const response = await fetchWithAuth(`/api/film/watched/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete");
            showSuccessToast("映画を削除しました");
            await fetchWatchedFilms();
        } catch (error) {
            console.error("Failed to delete watched film:", error);
            showErrorToast("削除に失敗しました");
        }
    };

    return {
        watchedFilmsByYear,
        isLoading,
        refetch: fetchWatchedFilms,
        deleteWatchedFilm,
    };
};
