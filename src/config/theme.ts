import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
    config: {
        initialColorMode: "system",
        useSystemColorMode: false,
    },
    fontSizes: {
        "2xs": "0.5rem", // 8px
        xs: "0.625rem", // 10px
        sm: "0.75rem", // 12px
        md: "0.875rem", // 14px
        lg: "1rem", // 16px
        xl: "1.125rem", // 18px
        "2xl": "1.25rem", // 20px
        "3xl": "1.5rem", // 24px
        "4xl": "2rem", // 32px
    },
    colors: {
        brand: {
            gray: {
                50: mode("#F7FAFC", "#000"),
                100: mode("#EDF2F7", "#171923"),
                200: mode("#E2E8F0", "#1A202C"),
                300: mode("#CBD5E0", "#2D3748"),
                400: mode("#A0AEC0", "#4A5568"),
                500: mode("#718096", "#718096"),
                600: mode("#4A5568", "#A0AEC0"),
                700: mode("#2D3748", "#CBD5E0"),
                800: mode("#1A202C", "#E2E8F0"),
                900: mode("#171923", "#EDF2F7"),
                1000: mode("#000", "#F7FAFC"),
            },
        },
    },
});

export default theme;
