import { FilmCard } from "@/components/cards/FilmCard";
import { FilmSearchCard } from "@/components/cards/FilmSearchCard";
import { apiUrl, TMDB_API_KEY } from "@/config";
import { TMDB_API_URL, TMDB_IMAGE_API_URL_MD } from "@/config/constants";
import { fetcher } from "@/features/utils/fetcher";
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
} from "@chakra-ui/react";
import dayjs from "dayjs";
import NextLink from "next/link";
import { FormEvent, useState } from "react";
import useSWR from "swr";

export default function FilmNote() {
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
    const [rating, setRating] = useState<number>(0);

    const today = dayjs().format("YYYY-MM-DD");
    const [watchedDate, setWatchedDate] = useState<string>(today);

    const [watchNote, setWatchNote] = useState<string>("");

    const toast = useToast();

    const createWatchedFilm = async (filmId: string, watchedDate: string, rating: number, watchNote: string): Promise<[any, number]> => {
        console.log(`create watched film: ${filmId}`);
        const isoWatchedDate = dayjs(watchedDate + "T00:00:00").toISOString();

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
                description: `filmId: ${filmId}\nrating: ${rating}\nwatchedDate: ${watchedDate}\nwatchNote: ${watchNote}`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setFilmId("");
            setRating(0);
            setWatchedDate(today);
            setWatchNote("");
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
                    film-note
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
                <Heading size="md" w="100%">
                    7/25
                </Heading>
                <FilmCard rating={4} filmId={"11973"} />
            </VStack>
        </>
    );
}
