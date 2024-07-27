import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import BasicLayout from "@/components/layout/BasicLayout";
import { DynamicThemeProvider } from "@/config/theme/DynamicThemeProvider";
import defaultTheme from "@/config/theme";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={defaultTheme}>
            <DynamicThemeProvider>
                <BasicLayout>
                    <Component {...pageProps} />
                </BasicLayout>
            </DynamicThemeProvider>
        </ChakraProvider>
    );
}
