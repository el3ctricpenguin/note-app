import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, IconButton, useColorMode } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactElement } from "react";

export default function BasicLayout({ children }: { children: ReactElement }) {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box w="100vw" h="100vh" bgColor="brand.gray.100" p={{ base: 5, sm: 10, md: 20 }}>
            <HStack justify="space-between">
                <Heading my={4} as="h1" size="2xl">
                    <NextLink href="/">note-app</NextLink>
                </Heading>
                <IconButton
                    aria-label={"Colormode Switcher"}
                    icon={colorMode == "light" ? <SunIcon /> : <MoonIcon />}
                    onClick={toggleColorMode}
                    size="sm"
                />
            </HStack>
            {children}
        </Box>
    );
}
