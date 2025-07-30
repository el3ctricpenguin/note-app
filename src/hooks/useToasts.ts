import { useToast } from "@chakra-ui/react";

export const useToasts = () => {
    const toast = useToast();

    const showSuccessToast = (title: string) => {
        toast({
            title,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    const showErrorToast = (title: string, description?: string) => {
        toast({
            title,
            description,
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    };

    return {
        showSuccessToast,
        showErrorToast,
    };
};
