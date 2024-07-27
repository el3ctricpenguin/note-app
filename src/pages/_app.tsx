import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import BasicLayout from "@/components/layout/BasicLayout";
import { DynamicThemeProvider } from "@/config/theme/DynamicThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
    // const[colorMode,setColorMode]=useState
    return (
        <ChakraProvider>
            <DynamicThemeProvider>
                <BasicLayout>
                    <Component {...pageProps} />
                </BasicLayout>
            </DynamicThemeProvider>
        </ChakraProvider>
    );
}
