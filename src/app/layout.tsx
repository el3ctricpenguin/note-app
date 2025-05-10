"use client";

import { DynamicThemeProvider } from "@/config/theme/DynamicThemeProvider";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import defaultTheme from "@/config/theme";
import BasicLayout from "@/components/layout/BasicLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0" />
            </head>
            <body>
                <ChakraProvider theme={defaultTheme}>
                    <DynamicThemeProvider>
                        <ColorModeScript initialColorMode="light" />
                        <BasicLayout>{children}</BasicLayout>
                    </DynamicThemeProvider>
                </ChakraProvider>
            </body>
        </html>
    );
}
