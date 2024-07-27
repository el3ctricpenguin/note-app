import { MoonIcon, StarIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Divider, Heading, HStack, IconButton, useColorMode, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactElement } from "react";

export default function BasicLayout({ children }: { children: ReactElement }) {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box w="100vw" h="100vh" bgColor="brand.gray.50" p={{ base: 5, sm: 10, md: 20 }}>
            <HStack my={4} justify="space-between">
                <Heading as="h1" size="2xl" color="brand.gray.900">
                    <NextLink href="/">note-app</NextLink>
                </Heading>
                <IconButton
                    aria-label={"Colormode Switcher"}
                    icon={colorMode == "light" ? <SunIcon /> : <MoonIcon />}
                    onClick={toggleColorMode}
                    size="sm"
                    mt={3}
                />
            </HStack>
            {children}
            <VStack mt={4}>
                <Divider borderColor="brand.gray.900" />
                <HStack spacing={0.5} justify="end" w="100%">
                    <StarIcon w={3} />
                    <StarIcon w={3} />
                </HStack>
            </VStack>
        </Box>
    );
}
