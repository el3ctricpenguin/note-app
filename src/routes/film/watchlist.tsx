import { FilmCard } from "@/components/cards/FilmCard";
import { FilmSearchCard } from "@/components/cards/FilmSearchCard";
import { apiUrl, TMDB_API_KEY } from "@/config";
import { TMDB_API_URL, TMDB_IMAGE_API_URL_MD } from "@/config/constants";
import { fetcher } from "@/features/utils/fetcher";
import { SearchIcon } from "@chakra-ui/icons";
import {
    Button,
    Divider,
    FormControl,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Textarea,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { Watchlist } from "@prisma/client";
import dayjs from "dayjs";
import NextLink from "next/link";
import { FormEvent, useEffect, useState } from "react";
import useSWR from "swr";

export default function FilmWatchlist() {
    const [watchlist, setWatchlist] = useState<Watchlist[]>([]);
    const fetchWatchlist = async () => {
        const response = await fetch(`${apiUrl}/film/watchlist`, { method: "GET" });
        const watchlistFilms = await response.json();
        console.log(watchlistFilms);
        setWatchlist(watchlistFilms);
    };
    useEffect(() => {
        fetchWatchlist();
    }, []);

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
        }, 10);
    };

    const [filmId, setFilmId] = useState<string>("");
    const [recommendedBy, setRecommendedBy] = useState<string>("");
    const [watchlistNote, setWatchlistNote] = useState<string>("");

    const toast = useToast();

    const createWatchlist = async (filmId: string, recommendedBy: string, note: string, isWatched: boolean): Promise<[any, number]> => {
        console.log(`create watchlist: ${filmId}`);

        const response = await fetch(`${apiUrl}/film/watchlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ filmId, recommendedBy, note, isWatched }),
        });
        return [await response.json(), response.status];
    };

    const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        const [response, status] = await createWatchlist(filmId, recommendedBy, watchlistNote, false);
        console.log(response);

        if (status == 201) {
            toast({
                title: "film registered",
                // description: `filmId: ${filmId}\nrating: ${rating}\nwatchedDate: ${watchedDate}\nwatchNote: ${watchNote}`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setFilmId("");
            setRecommendedBy("");
            setWatchlistNote("");
            setSearchText("");
            await fetchWatchlist();
        }
        if (status == 500) {
            toast({
                title: "film register failed",
                description: `${response.error}`,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Heading size="xl" mb={4}>
                <Link as={NextLink} href="/film" mr={4}>
                    /film
                </Link>
                <Link as={NextLink} href="/film/watchlist" mr={4}>
                    /watchlist
                </Link>
            </Heading>
            <Heading size="lg" my={1}>
                ウォッチリスト登録
            </Heading>
            <FormControl mb={4} as="form" onSubmit={handleSubmit}>
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
                            divider={<Divider borderColor="brand.gray.400" opacity={1} />}
                            position="absolute"
                            top={10}
                            zIndex={5}
                            borderRadius="md"
                            overflow="hidden"
                            border="1px"
                            borderColor="brand.gray.400"
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
                    <FilmCard filmId={filmId} />
                    <Input
                        placeholder="おすすめ元"
                        variant="filled"
                        value={recommendedBy}
                        onChange={(e) => {
                            setRecommendedBy(e.target.value);
                        }}
                    />
                    <Textarea
                        placeholder="メモ"
                        variant="filled"
                        value={watchlistNote}
                        onChange={(e) => {
                            setWatchlistNote(e.target.value);
                        }}
                    />
                    <Button
                        type="submit"
                        w="100%"
                        color="brand.gray.0"
                        bgColor="brand.gray.1000"
                        _hover={{ color: "brand.gray.0", bgColor: "brand.gray.1000", opacity: 0.75 }}
                    >
                        登録
                    </Button>
                </VStack>
            </FormControl>
            <Heading size="lg" my={1}>
                ウォッチリスト
            </Heading>
            <VStack>
                {watchlist.map((film, i) => (
                    <FilmCard key={i} filmId={film.filmId.toString()} />
                ))}
            </VStack>
        </>
    );
}
