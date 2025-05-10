import { ThemeProvider, ThemeProviderProps, useColorMode } from "@chakra-ui/react";
import { theme } from ".";

export type Props = Omit<ThemeProviderProps, "theme">;

export const DynamicThemeProvider = (props: Props) => {
    const { colorMode } = useColorMode();
    return <ThemeProvider theme={theme[colorMode]} {...props} />;
};
