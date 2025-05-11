import { getSession } from "@/lib/session";
import LayoutClient from "./layout-client";
import SessionProvider from "@/components/context/SessionProvider";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession();
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0" />
            </head>
            <body>
                <SessionProvider session={session}>
                    <LayoutClient>{children}</LayoutClient>
                </SessionProvider>
            </body>
        </html>
    );
}
