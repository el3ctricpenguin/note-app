import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { WatchedFilm, Watchlist } from "@prisma/client";
import { TMDB_API_KEY, TMDB_API_URL } from "@/config/constants";
import { TMDBFilmData } from "@/types";

interface UseFilmModalReturn {
    filmRecord: WatchedFilm | Watchlist | undefined;
    filmData: TMDBFilmData | null;
    isOpen: boolean;
    onClose: () => void;
    openModal: (_recordId: number) => void;
}

export const useFilmModal = (type: "watched" | "watchlist"): UseFilmModalReturn => {
    const [filmRecord, setFilmRecord] = useState<WatchedFilm | Watchlist | undefined>();
    const [filmData, setFilmData] = useState<TMDBFilmData | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openModal = async (id: number) => {
        const recordResponse = fetch(`/api/film/${type}/${id}`);
        const record = await (await recordResponse).json();

        const [, tmdbResponse] = await Promise.all([
            recordResponse,
            fetch(`${TMDB_API_URL}/movie/${record.filmId}?language=en-US&api_key=${TMDB_API_KEY}`),
        ]);

        const tmdbData = await tmdbResponse.json();

        setFilmRecord(record);
        setFilmData(tmdbData);
        onOpen();
    };

    return {
        filmRecord,
        filmData,
        isOpen,
        onClose,
        openModal,
    };
};
