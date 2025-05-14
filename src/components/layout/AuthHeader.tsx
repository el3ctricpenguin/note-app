import { Heading, HStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useSession } from "@/components/context/SessionProvider";
import { disabledLinkStyle, enabledLinkStyle } from "@/config/theme/styles";

const signOut = async () => {
    const response = await fetch("/api/sign-out", { method: "DELETE" });
    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.error);

    window.location.href = "/";
};

export default function AuthHeader() {
    const session = useSession();
    return (
        <Heading size="xl" mb={4}>
            <HStack spacing={{ base: 2.5, md: 4 }}>
                <Link as={NextLink} href="/sign-in" sx={session ? disabledLinkStyle : enabledLinkStyle}>
                    /sign-in
                </Link>
                <Link as={NextLink} href="/sign-up" sx={session ? disabledLinkStyle : enabledLinkStyle}>
                    /sign-up
                </Link>
                <Link href="#" sx={!session ? disabledLinkStyle : enabledLinkStyle} onClick={signOut}>
                    /sign-out
                </Link>
            </HStack>
        </Heading>
    );
}
