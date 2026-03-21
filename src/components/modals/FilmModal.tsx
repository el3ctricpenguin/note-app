import { useState } from "react";
import { BasicModal } from "./BasicModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { WatchedModalContent } from "./parts/WatchedModalContent";
import { WatchlistModalContent } from "./parts/WatchlistModalContent";
import { WatchedFilm, Watchlist } from "@prisma/client";
import { TMDBFilmData } from "@/types";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface FilmModalProps {
    filmRecord: WatchedFilm | Watchlist;
    filmData: TMDBFilmData | null;
    type: "watched" | "watchlist";
    isOpen: boolean;
    onClose: () => void;
    onListUpdate?: () => void;
    onDelete?: (_id: number) => Promise<void>;
}

export const FilmModal = ({ filmRecord, filmData, type, isOpen, onClose, onListUpdate, onDelete }: FilmModalProps) => {
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = () => {
        setIsDeleteConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!onDelete) return;
        setIsDeleting(true);
        try {
            await onDelete(filmRecord.id);
            setIsDeleteConfirmOpen(false);
            onClose();
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <BasicModal title="" isOpen={isOpen} onClose={onClose}>
                {type === "watchlist" ? (
                    <WatchlistModalContent filmRecord={filmRecord as Watchlist} filmData={filmData} onListUpdate={onListUpdate} />
                ) : (
                    <WatchedModalContent filmRecord={filmRecord as WatchedFilm} filmData={filmData} onListUpdate={onListUpdate} />
                )}
                {onDelete && (
                    <IconButton
                        aria-label="削除"
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        variant="ghost"
                        size="sm"
                        onClick={handleDeleteClick}
                        position="absolute"
                        top={3}
                        right={12}
                    />
                )}
            </BasicModal>
            <DeleteConfirmModal
                isOpen={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
            />
        </>
    );
};
