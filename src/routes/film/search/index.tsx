import { FilmSearchCard } from "@/components/cards/FilmSearchCard";
import { TMDB_API_KEY } from "@/config";
import { TMDB_API_URL, TMDB_IMAGE_API_URL_MD } from "@/config/constants";
import { fetcher } from "@/features/utils/fetcher";
import { SearchIcon } from "@chakra-ui/icons";
import { FormControl, Heading, Input, InputGroup, InputRightElement, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import NextLink from "next/link";

export default function FilmSearch() {
    const placeholderFilm = {
        rating: undefined,
        title: undefined,
        startYear: undefined,
        posterUrl: undefined,
        originCountries: undefined,
    };
    const toast = useToast();

    const [searchText, setSearchText] = useState<string>("");

    const { data, error, isLoading } = useSWR(
        `${TMDB_API_URL}/search/movie?query=${searchText}&language=en-US&page=1&api_key=${TMDB_API_KEY}`,
        fetcher
    );

    return (
        <>
            <Heading size="xl" mb={4}>
                <NextLink href="/film">film-note</NextLink>/<NextLink href="/film/search">search</NextLink>
            </Heading>
            <VStack spacing={2}>
                <FormControl>
                    <InputGroup>
                        <Input
                            placeholder="映画名"
                            variant="filled"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                        <InputRightElement pointerEvents="none">
                            <SearchIcon aspectRatio={1} />
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <VStack w="100%">
                    {data?.results
                        .filter((_: any, i: number) => i < 5)
                        .map((film: any, i: any) => (
                            <FilmSearchCard
                                key={i}
                                title={film.original_title}
                                startYear={film.release_date.split("-")[0]}
                                posterUrl={TMDB_IMAGE_API_URL_MD + film.poster_path}
                                overview={film.overview}
                                filmId={film.id}
                            />
                        ))}
                </VStack>
            </VStack>
        </>
    );
}
