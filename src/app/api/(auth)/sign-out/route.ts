import { clearSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        clearSession();
        console.log("User successfully signed out");
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
    }
}
