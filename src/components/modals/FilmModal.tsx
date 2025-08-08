import { BasicModal } from "./BasicModal";
import { WatchedModalContent } from "./parts/WatchedModalContent";
import { WatchlistModalContent } from "./parts/WatchlistModalContent";

interface FilmModalProps {
    recordId: number;
    type: "watched" | "watchlist";
    isOpen: boolean;
    onClose: () => void;
}

export const FilmModal = ({ recordId, type, isOpen, onClose }: FilmModalProps) => {
    return (
        <BasicModal title="" isOpen={isOpen} onClose={onClose}>
            {type === "watchlist" ? <WatchlistModalContent recordId={recordId} /> : <WatchedModalContent recordId={recordId} />}
        </BasicModal>
    );
};
