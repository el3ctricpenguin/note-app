import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

interface UseFilmModalReturn {
    recordId: number | undefined;
    isOpen: boolean;
    onClose: () => void;
    openModal: (_recordId: number) => void;
}

export const useFilmModal = (): UseFilmModalReturn => {
    const [recordId, setRecordId] = useState<number | undefined>();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openModal = (id: number) => {
        setRecordId(id);
        setTimeout(() => {
            onOpen();
        }, 0);
    };

    return {
        recordId,
        isOpen,
        onClose,
        openModal,
    };
};
