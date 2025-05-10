import { DynamicThemeProvider } from "@/config/theme/DynamicThemeProvider";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import defaultTheme from "@/config/theme";
import BasicLayout from "@/components/layout/BasicLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider theme={defaultTheme}>
            <DynamicThemeProvider>
                <html lang="en">
                    <head>
                        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0" />
                    </head>
                    <body>
                        <ColorModeScript initialColorMode="light" />
                        <BasicLayout>{children}</BasicLayout>
                    </body>
                </html>
            </DynamicThemeProvider>
        </ChakraProvider>
    );
}
