import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { BasicModal } from "./BasicModal";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, isLoading }: DeleteConfirmModalProps) => {
    return (
        <BasicModal title="削除確認" isOpen={isOpen} onClose={onClose} closeOnOverlayClick={!isLoading}>
            <VStack spacing={4} py={2}>
                <Text>この映画を削除しますか？この操作は取り消せません。</Text>
                <HStack spacing={3} w="100%" justifyContent="flex-end">
                    <Button variant="ghost" onClick={onClose} isDisabled={isLoading}>
                        キャンセル
                    </Button>
                    <Button colorScheme="red" onClick={onConfirm} isLoading={isLoading}>
                        削除
                    </Button>
                </HStack>
            </VStack>
        </BasicModal>
    );
};
