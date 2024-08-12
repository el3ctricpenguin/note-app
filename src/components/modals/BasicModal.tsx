import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalContentProps,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useMediaQuery,
} from "@chakra-ui/react";
interface BasicModalProps {
    children: React.ReactNode;
    title: string;
    isOpen: boolean;
    onClose: () => void;
    closeOnOverlayClick?: boolean;
    modalContentProps?: ModalContentProps;
}
export const BasicModal = ({ children, title, isOpen, onClose, closeOnOverlayClick, modalContentProps }: BasicModalProps) => {
    const [isDesktop] = useMediaQuery("(min-width: 768px)");
    return isDesktop ? (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={closeOnOverlayClick} autoFocus={false}>
            <ModalOverlay />
            <ModalContent {...modalContentProps}>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                {children}
            </ModalContent>
        </Modal>
    ) : (
        <></>
    );
};
