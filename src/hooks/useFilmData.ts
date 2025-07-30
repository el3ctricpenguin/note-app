import { useState, useEffect, useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import { apiUrl } from "@/config";
import { GroupedFilms } from "@/types";
import dayjs from "dayjs";

export const useFilmData = (type: "watched" | "watchlist") => {
    const [filmData, setFilmData] = useState<GroupedFilms | any[]>(type === "watched" ? {} : []);
    const [filmId, setFilmId] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [watchedDate, setWatchedDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
    const [watchNote, setWatchNote] = useState<string>("");
    const toast = useToast();

    const fetchFilmData = useCallback(async () => {
        const endpoint = type === "watched" ? "/film/watched/by-date" : "/film/watchlist";
        const response = await fetch(`${apiUrl}${endpoint}`, { method: "GET" });
        const data = await response.json();
        console.log(data);
        setFilmData(data);
    }, [type]);

    useEffect(() => {
        fetchFilmData();
    }, [fetchFilmData]);

    const createWatchedFilm = async (filmId: string, watchedDate: string, rating: number, watchNote: string): Promise<[any, number]> => {
        console.log(`create watched film: ${filmId}`);
        const isoWatchedDate = dayjs(watchedDate).toISOString();
        const response = await fetch(`${apiUrl}/film/watched`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                filmId: Number(filmId),
                watchedDate: isoWatchedDate,
                rating: rating,
                note: watchNote,
            }),
        });
        const responseData = await response.json();
        return [responseData, response.status];
    };

    const createWatchlistFilm = async (filmId: string, recommendedBy: string, watchNote: string): Promise<[any, number]> => {
        console.log(`create watchlist film: ${filmId}`);
        const response = await fetch(`${apiUrl}/film/watchlist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                filmId: Number(filmId),
                recommendedBy: recommendedBy,
                note: watchNote,
                isWatched: false,
            }),
        });
        const responseData = await response.json();
        return [responseData, response.status];
    };

    const handleAddFilm = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let response, status;
        if (type === "watched") {
            [response, status] = await createWatchedFilm(filmId, watchedDate, rating, watchNote);
        } else {
            [response, status] = await createWatchlistFilm(filmId, "", watchNote);
        }

        if (status === 201) {
            toast({
                title: `${type === "watched" ? "Watched" : "Watchlist"} film created successfully`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            fetchFilmData();
        } else {
            toast({
                title: `Failed to create ${type} film`,
                description: response.error,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return {
        filmData,
        filmId,
        setFilmId,
        rating,
        setRating,
        watchedDate,
        setWatchedDate,
        watchNote,
        setWatchNote,
        handleAddFilm,
        fetchFilmData,
    };
};