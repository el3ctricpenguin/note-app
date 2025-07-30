"use client";

import { FilmCard } from "@/components/cards/FilmCard";
import { FilmSearchCard } from "@/components/cards/FilmSearchCard";
import { FilmModal } from "@/components/modals/FilmModal";
import { disabledLinkStyle, enabledLinkStyle } from "@/config/theme/styles";
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
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import NextLink from "next/link";
import { useState } from "react";
import { useFilmSearch } from "@/hooks/useFilmSearch";
import { useFilmData } from "@/hooks/useFilmData";
import { TMDB_IMAGE_API_URL_MD } from "@/config/constants";

export default function FilmNote() {
    const { searchText, setSearchText, searchResults: data, isFocused, handleFocus, handleBlur } = useFilmSearch();
    const {
        filmData: watchedFilmsByDate,
        filmId,
        setFilmId,
        rating,
        setRating,
        watchedDate,
        setWatchedDate,
        watchNote,
        setWatchNote,
        handleAddFilm,
        fetchFilmData,
    } = useFilmData("watched");

    const handleSubmit = handleAddFilm;

    const [watchedFilmId, setWatchedFilmId] = useState<number>();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Heading size="xl" mb={4}>
                <Link as={NextLink} href="/film" mr={4} {...disabledLinkStyle}>
                    /film
                </Link>
                <Link as={NextLink} href="/film/watchlist" mr={4} {...enabledLinkStyle}>
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
                        {(films as any[]).map((film: any, i: number) => (
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
            {watchedFilmId && <FilmModal id={watchedFilmId} type="watched" isOpen={isOpen} onClose={onClose} />}
        </>
    );
}
