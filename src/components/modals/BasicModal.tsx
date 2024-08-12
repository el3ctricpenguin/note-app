import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalContentProps,
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
    const [isDesktop] = useMediaQuery("(min-width: 480px)");
    return isDesktop ? (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={closeOnOverlayClick}
            autoFocus={false}
            size={{ base: "lg", xl: "2xl", "2xl": "4xl" }}
        >
            <ModalOverlay />
            <ModalContent {...modalContentProps}>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>
            </ModalContent>
        </Modal>
    ) : (
        <Drawer isOpen={isOpen} onClose={onClose} placement="bottom" autoFocus={false}>
            <DrawerOverlay />
            <DrawerContent maxH="80%" px={0}>
                <DrawerCloseButton />
                <DrawerHeader>{title}</DrawerHeader>
                <DrawerBody>{children}</DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};
