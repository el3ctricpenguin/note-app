import { drawerAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
    dialog: {
        bg: "brand.cardBg",
    },
});

export const drawerConfig = defineMultiStyleConfig({
    baseStyle,
});
