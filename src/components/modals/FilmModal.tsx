import { BasicModal } from "./BasicModal";
import { WatchedModalContent } from "./parts/WatchedModalContent";
import { WatchlistModalContent } from "./parts/WatchlistModalContent";
import { WatchedFilm, Watchlist } from "@prisma/client";
import { TMDBFilmData } from "@/types";

interface FilmModalProps {
    filmRecord: WatchedFilm | Watchlist;
    filmData: TMDBFilmData | null;
    type: "watched" | "watchlist";
    isOpen: boolean;
    onClose: () => void;
}

export const FilmModal = ({ filmRecord, filmData, type, isOpen, onClose }: FilmModalProps) => {
    return (
        <BasicModal title="" isOpen={isOpen} onClose={onClose}>
            {type === "watchlist" ? (
                <WatchlistModalContent filmRecord={filmRecord as Watchlist} filmData={filmData} />
            ) : (
                <WatchedModalContent filmRecord={filmRecord as WatchedFilm} filmData={filmData} />
            )}
        </BasicModal>
    );
};
