import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

export const inputConfig = defineMultiStyleConfig({
    variants: {
        filled: definePartsStyle({
            field: {
                bgColor: "brand.gray.100",
                _hover: { bgColor: "brand.gray.100" },
                _dark: {
                    bgColor: "brand.gray.200",
                    _hover: { bgColor: "brand.gray.300" },
                },
            },
        }),
    },
});
