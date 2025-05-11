"use client";

import { DynamicThemeProvider } from "@/config/theme/DynamicThemeProvider";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import defaultTheme from "@/config/theme";
import BasicLayout from "@/components/layout/BasicLayout";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider theme={defaultTheme}>
            <DynamicThemeProvider>
                <ColorModeScript initialColorMode="light" />
                <BasicLayout>{children}</BasicLayout>
            </DynamicThemeProvider>
        </ChakraProvider>
    );
}
