import { clearSession } from "@/lib/session";
import { withErrorHandling, createSuccessResponse } from "@/lib/api";

export async function DELETE() {
    return withErrorHandling(async () => {
        clearSession();
        console.log("User successfully signed out");
        return createSuccessResponse({});
    });
}
