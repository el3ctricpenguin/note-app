import { MoonIcon, StarIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Divider, Heading, HStack, IconButton, Spacer, Text, useColorMode, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useSession } from "../context/SessionProvider";

export default function BasicLayout({ children }: { children: React.ReactNode }) {
    const { colorMode, toggleColorMode } = useColorMode();
    const session = useSession();
    return (
        <Box w="100%" h="100%" bgColor="brand.gray.0" p={{ base: 5, sm: 10, md: 20 }}>
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
                    bgColor="brand.gray.100"
                    _hover={{
                        bgColor: "brand.gray.200",
                    }}
                />
            </HStack>
            {children}
            <VStack mt={4}>
                <Divider borderColor="brand.gray.900" />
                <HStack w="100%">
                    <Text>{session && `logged in as: ${session.username}`}</Text>
                    <Spacer />
                    <HStack spacing={0.5}>
                        <StarIcon w={3} />
                        <StarIcon w={3} />
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    );
}
