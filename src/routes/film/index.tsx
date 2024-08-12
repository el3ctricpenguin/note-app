import { FilmCard } from "@/components/cards/FilmCard";
import { FilmSearchCard } from "@/components/cards/FilmSearchCard";
import { WatchedFilmModal } from "@/components/modals/WatchedFilmModal";
import { apiUrl, TMDB_API_KEY } from "@/config";
import { TMDB_API_URL, TMDB_IMAGE_API_URL_MD } from "@/config/constants";
import { fetcher } from "@/features/utils/fetcher";
import { GroupedFilms } from "@/types";
import { SearchIcon } from "@chakra-ui/icons";
import {
    Divider,
    FormControl,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Textarea,
    VStack,
    Text,
    Button,
    useToast,
    useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import NextLink from "next/link";
import { FormEvent, useEffect, useState } from "react";
import useSWR from "swr";

export default function FilmNote() {
    const [watchedFilmsByDate, setWatchedFilms] = useState<GroupedFilms>({});
    const fetchWatchedFilms = async () => {
        const response = await fetch(`${apiUrl}/film/watched/by-date`, { method: "GET" });
        const watchedFilms = await response.json();
        console.log(watchedFilms);
        setWatchedFilms(watchedFilms);
    };
    useEffect(() => {
        fetchWatchedFilms();
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
    const [rating, setRating] = useState<number>(0);

    const today = dayjs().format("YYYY-MM-DD");
    const [watchedDate, setWatchedDate] = useState<string>(today);

    const [watchNote, setWatchNote] = useState<string>("");

    const toast = useToast();

    const createWatchedFilm = async (filmId: string, watchedDate: string, rating: number, watchNote: string): Promise<[any, number]> => {
        console.log(`create watched film: ${filmId}`);
        const isoWatchedDate = dayjs(watchedDate).toISOString();

        const response = await fetch(`${apiUrl}/film/watched`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ filmId, watchedDate: isoWatchedDate, rating, watchNote }),
        });
        return [await response.json(), response.status];
    };

    const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        const [response, status] = await createWatchedFilm(filmId, watchedDate, rating, watchNote);
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
            setRating(0);
            setWatchedDate(today);
            setWatchNote("");
            setSearchText("");
            await fetchWatchedFilms();
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

    const [watchedFilmId, setWatchedFilmId] = useState<number>();
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                映画登録
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
                    <FilmCard rating={rating} setRating={setRating} filmId={filmId} />
                    <Input
                        placeholder="視聴した日付"
                        type="date"
                        variant="filled"
                        value={watchedDate}
                        onChange={(e) => {
                            setWatchedDate(e.target.value);
                        }}
                    />
                    <Textarea
                        placeholder="メモ"
                        variant="filled"
                        value={watchNote}
                        onChange={(e) => {
                            setWatchNote(e.target.value);
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
                視聴記録
            </Heading>
            <VStack>
                {Object.entries(watchedFilmsByDate).map(([date, films]) => (
                    <>
                        <Heading size="md" w="100%">
                            {dayjs(date).format("MM/DD")}
                        </Heading>
                        {films.map((film, i) => (
                            <FilmCard
                                key={i}
                                rating={film.rating}
                                filmId={film.filmId.toString()}
                                onClick={() => {
                                    setWatchedFilmId(film.id);
                                    setTimeout(() => {
                                        onOpen();
                                    }, 50);
                                }}
                            />
                        ))}
                    </>
                ))}
            </VStack>
            {watchedFilmId && <WatchedFilmModal watchedFilmId={watchedFilmId} isOpen={isOpen} onClose={onClose} />}
        </>
    );
}
