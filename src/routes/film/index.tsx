import { FilmCard } from "@/components/cards/FilmCard";
import { FilmSearchCard } from "@/components/cards/FilmSearchCard";
import { TMDB_API_KEY } from "@/config";
import { TMDB_API_URL, TMDB_IMAGE_API_URL_MD } from "@/config/constants";
import { fetcher } from "@/features/utils/fetcher";
import { SearchIcon } from "@chakra-ui/icons";
import { Divider, FormControl, Heading, Input, InputGroup, InputRightElement, Link, Textarea, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function FilmNote() {
    const filmData = {
        rating: 4,
        title: "Thirteen Days",
        startYear: 2000,
        posterUrl:
            "https://m.media-amazon.com/images/M/MV5BZDM5NzBkZWMtZDY2Ny00OGMxLTgzMDUtZDZkNzRhM2M5MDIxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
        originCountries: ["US"],
    };
    const placeholderFilm = {
        rating: undefined,
        title: undefined,
        startYear: undefined,
        posterUrl: undefined,
        originCountries: undefined,
    };

    const [searchText, setSearchText] = useState<string>("");
    const { data, error, isLoading } = useSWR(
        `${TMDB_API_URL}/search/movie?query=${searchText}&language=en-US&page=1&api_key=${TMDB_API_KEY}`,
        fetcher
    );

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 1);
    };

    const [filmId, setFilmId] = useState<string>("");
    console.log("filmId", filmId);

    return (
        <>
            <Heading size="xl" mb={4}>
                <Link as={NextLink} href="/film" mr={4}>
                    film-note
                </Link>
                <Link as={NextLink} href="/film/search">
                    /search
                </Link>
            </Heading>
            <Heading size="lg" my={1}>
                映画登録
            </Heading>
            <FormControl mb={4}>
                <VStack spacing={2}>
                    <InputGroup>
                        <Input
                            placeholder="映画名"
                            variant="filled"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <InputRightElement pointerEvents="none">
                            <SearchIcon mr={2} />
                        </InputRightElement>
                    </InputGroup>
                    {isFocused && (
                        <VStack
                            w="100%"
                            spacing={0}
                            divider={<Divider borderColor="brand.gray.400" />}
                            position="absolute"
                            top={10}
                            zIndex={5}
                            borderRadius="md"
                            overflow="hidden"
                        >
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
                                        disableRadius
                                        onClick={() => {
                                            setFilmId(film.id);
                                        }}
                                    />
                                ))}
                        </VStack>
                    )}
                    <FilmCard rating={placeholderFilm.rating} filmId={filmId} />
                    <Input placeholder="視聴した日付" type="date" value="" variant="filled" />
                    <Textarea placeholder="メモ" variant="filled"></Textarea>
                </VStack>
            </FormControl>
            <Heading size="lg" my={1}>
                視聴記録
            </Heading>
            <VStack>
                <Heading size="md" w="100%">
                    7/25
                </Heading>
                <FilmCard rating={filmData.rating} filmId={"11973"} />
            </VStack>
        </>
    );
}
