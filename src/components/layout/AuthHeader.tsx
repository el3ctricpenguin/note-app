import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useSession } from "@/components/context/SessionProvider";

const disabledLinkStyle = {
    pointerEvents: "none",
    cursor: "none",
    textDecoration: "none",
    color: "brand.gray.400",
} as const;

const enabledLinkStyle = {
    pointerEvents: "auto",
    cursor: "pointer",
    textDecoration: "underline",
    color: "brand.gray.1000",
    _hover: { textDecoration: "none" },
} as const;

export default function AuthHeader() {
    const session = useSession();
    return (
        <Heading size="xl" mb={4}>
            <Link mr={4} as={NextLink} href="/sign-in" sx={session ? disabledLinkStyle : enabledLinkStyle}>
                /sign-in
            </Link>
            <Link as={NextLink} href="/sign-up" sx={session ? disabledLinkStyle : enabledLinkStyle}>
                /sign-up
            </Link>
        </Heading>
    );
}
