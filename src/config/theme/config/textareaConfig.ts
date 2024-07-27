import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const filled = defineStyle({
    bgColor: "brand.gray.100",
    _hover: { bgColor: "brand.gray.100" },
    _focusVisible: {
        borderColor: "brand.gray.1000",
    },
    _dark: {
        bgColor: "brand.gray.200",
        _hover: { bgColor: "brand.gray.300" },
    },
});

export const textareaConfig = defineStyleConfig({
    variants: { filled },
});
