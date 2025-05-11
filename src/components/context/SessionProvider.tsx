"use client";

import React, { createContext, useContext } from "react";

type Session = {
    username: string;
} | null;

type SessionProviderProps = {
    children: React.ReactNode;
    session: Session;
};

const SessionContext = createContext<Session | undefined>(undefined);

export default function SessionProvider({ children, session }: SessionProviderProps) {
    return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export function useSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        // Pages Routerとの兼ね合いがあるためThrow Errorしない
        console.error("useSession must be used within a SessionProvider");
        return null;
    }
    return context;
}
