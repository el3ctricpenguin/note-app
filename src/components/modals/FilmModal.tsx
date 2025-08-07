import { BasicModal } from "./BasicModal";
import { WatchedModalContent } from "./parts/WatchedModalContent";
import { WatchlistModalContent } from "./parts/WatchlistModalContent";

interface FilmModalProps {
    id: number;
    type: "watched" | "watchlist";
    isOpen: boolean;
    onClose: () => void;
}

export const FilmModal = ({ id, type, isOpen, onClose }: FilmModalProps) => {

    return (
        <BasicModal title="" isOpen={isOpen} onClose={onClose}>
            {type === "watchlist" ? (
                <WatchlistModalContent recordId={id} />
            ) : (
                <WatchedModalContent recordId={id} />
            )}
        </BasicModal>
    );
};
