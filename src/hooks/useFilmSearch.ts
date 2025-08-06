import { TMDB_API_KEY } from "@/config";
import { TMDB_API_URL } from "@/config/constants";
import { fetcher } from "@/features/utils/fetcher";
import { useState } from "react";
import useSWR from "swr";

interface UseFilmSearchReturn {
    searchText: string;
    setSearchText: (_: string) => void;
    searchResults: any;
    resetSearch: () => void;
}

export const useFilmSearch = (): UseFilmSearchReturn => {
    const [searchText, setSearchText] = useState<string>("");

    const { data: searchResults } = useSWR(
        searchText ? `${TMDB_API_URL}/search/movie?query=${searchText}&language=en-US&page=1&api_key=${TMDB_API_KEY}` : null,
        fetcher,
    );

    const resetSearch = () => {
        setSearchText("");
    };

    return {
        searchText,
        setSearchText,
        searchResults,
        resetSearch,
    };
};
