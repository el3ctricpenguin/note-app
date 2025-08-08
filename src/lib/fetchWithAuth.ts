export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const response = await fetch(url, options);

    if (response.status === 401) {
        window.location.href = "/sign-in";
        throw new Error("Authentication required");
    }

    return response;
}

export async function fetchJsonWithAuth<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetchWithAuth(url, options);
    return await response.json();
}
