export const disabledLinkStyle = {
    pointerEvents: "none",
    cursor: "none",
    color: "brand.gray.400",
} as const;

export const enabledLinkStyle = {
    pointerEvents: "auto",
    cursor: "pointer",
    color: "brand.gray.1000",
    _hover: { textDecoration: "none" },
} as const;
