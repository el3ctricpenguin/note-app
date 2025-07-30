import { useState, useMemo } from "react";
import useSWR from "swr";
import { TMDB_API_KEY } from "@/config";
import { TMDB_API_URL } from "@/config/constants";
import { fetcher } from "@/features/utils/fetcher";

export const useFilmSearch = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [isFocused, setIsFocused] = useState(false);

    const { data } = useSWR(
        `${TMDB_API_URL}/search/movie?query=${searchText}&language=en-US&page=1&api_key=${TMDB_API_KEY}`,
        fetcher
    );

    const filteredResults = useMemo(() => {
        if (!data?.results) return [];
        return data.results.filter((movie: any) => movie.poster_path && movie.release_date);
    }, [data]);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 150);
    };

    return {
        searchText,
        setSearchText,
        searchResults: data,
        filteredResults,
        isFocused,
        handleFocus,
        handleBlur,
    };
};