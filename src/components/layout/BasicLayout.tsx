import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { ReactElement } from "react";

export default function BasicLayout({ children }: { children: ReactElement }) {
    return (
        <Box w="100vw" h="100vh" bgColor="gray.50" p={{ base: 5, sm: 10, md: 20 }}>
            <Heading my={4} as="h1" size="2xl">
                <Link href="/">note-app</Link>
            </Heading>
            {children}
        </Box>
    );
}
