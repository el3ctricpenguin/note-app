export function validateBasicAuth(authHeader: string | null): boolean {
    if (!authHeader?.startsWith("Basic ")) {
        return false;
    }

    try {
        const base64Credentials = authHeader.slice(6);
        const credentials = atob(base64Credentials);
        const [username, password] = credentials.split(":");

        if (!username || !password) {
            return false;
        }

        const usersJson = process.env.BASIC_AUTH_USERS;
        if (!usersJson) {
            console.error("BASIC_AUTH_USERS environment variable is not set");
            return false;
        }

        const users = JSON.parse(usersJson);
        return users[username] === password;
    } catch (error) {
        console.error("Basic auth validation error:", error);
        return false;
    }
}

export function createBasicAuthResponse(): Response {
    return new Response("Authentication required", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
    });
}
