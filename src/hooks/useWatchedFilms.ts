import { useEffect, useState } from "react";
import { fetchJsonWithAuth } from "@/lib/fetchWithAuth";
import { GroupedFilms } from "@/types";
import dayjs from "dayjs";

export const useWatchedFilms = () => {
    const [watchedFilmsByDate, setWatchedFilms] = useState<GroupedFilms>({});

    const fetchWatchedFilms = async () => {
        try {
            const watchedFilms = await fetchJsonWithAuth<GroupedFilms>(`/api/film/watched/by-date`);
            setWatchedFilms(watchedFilms);
        } catch (error) {
            console.error("Failed to fetch watched films:", error);
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
    const watchedFilmsByYear = Object.entries(filmsByYearAndDate).map(([year, dateGroups]) => ({
        year,
        dateGroups: Object.entries(dateGroups).map(([date, films]) => ({ date, films })),
    }));

    return {
        watchedFilmsByYear,
        refetch: fetchWatchedFilms,
    };
};
