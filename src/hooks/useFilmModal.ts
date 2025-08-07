import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

interface UseFilmModalReturn {
    filmId: number | undefined;
    isOpen: boolean;
    onClose: () => void;
    openModal: (_filmId: number) => void;
}

export const useFilmModal = (): UseFilmModalReturn => {
    const [filmId, setFilmId] = useState<number | undefined>();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openModal = (id: number) => {
        setFilmId(id);
        setTimeout(() => {
            onOpen();
        }, 50);
    };

    return {
        filmId,
        isOpen,
        onClose,
        openModal,
    };
};
