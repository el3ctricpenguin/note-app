"use client";

import { FilmCard } from "@/components/cards/FilmCard";
import { FilmRegistrationForm, WatchedFormData } from "@/components/form/FilmRegistrationForm";
import { FilmModal } from "@/components/modals/FilmModal";
import { disabledLinkStyle, enabledLinkStyle } from "@/config/theme/styles";
import { useFilmModal } from "@/hooks/useFilmModal";
import { useToasts } from "@/hooks/useToasts";
import { useWatchedFilms } from "@/hooks/useWatchedFilms";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { Heading, Link, VStack, Spinner } from "@chakra-ui/react";
import dayjs from "dayjs";
import NextLink from "next/link";

export default function FilmNote() {
    const { watchedFilmsByYear, isLoading, refetch } = useWatchedFilms();

    const { showSuccessToast, showErrorToast } = useToasts();

    const handleWatchedSubmit = async (data: WatchedFormData): Promise<boolean> => {
        console.log(`create watched film: ${data.filmId}`);

        try {
            const response = await fetchWithAuth(`/api/film/watched`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    filmId: data.filmId,
                    watchedDate: data.watchedDate,
                    rating: data.rating,
                    note: data.watchNote,
                }),
            });

            const result = await response.json();
            console.log(result);

            if (response.status === 201) {
                showSuccessToast("film registered");
                await refetch();
                return true;
            } else {
                showErrorToast("film register failed", result.error);
                return false;
            }
        } catch (error) {
            console.error("Failed to register watched film:", error);
            showErrorToast("film register failed");
            return false;
        }
    };

    const { filmRecord, filmData, isOpen, onClose, openModal } = useFilmModal("watched");
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
            <FilmRegistrationForm type="watched" onSubmit={handleWatchedSubmit} />
            <Heading size="lg" my={1}>
                視聴記録
            </Heading>
            <VStack spacing={4}>
                {isLoading ? (
                    <Spinner size="lg" />
                ) : watchedFilmsByYear.length === 0 ? (
                    <Heading size="md">No watched film</Heading>
                ) : (
                    watchedFilmsByYear.map(({ year, dateGroups }) => (
                        <div key={year} style={{ width: "100%" }}>
                            <Heading size="lg" w="100%" mb={2}>
                                {year}
                            </Heading>
                            <VStack spacing={4}>
                                {dateGroups.map(({ date, films }) => (
                                    <div key={date} style={{ width: "100%" }}>
                                        <Heading size="md" w="100%" mb={2}>
                                            {dayjs(date).format("MM/DD")}
                                        </Heading>
                                        <VStack spacing={2}>
                                            {films.map((film, i) => (
                                                <FilmCard
                                                    key={i}
                                                    rating={film.rating}
                                                    filmId={film.filmId.toString()}
                                                    onClick={() => openModal(film.id)}
                                                />
                                            ))}
                                        </VStack>
                                    </div>
                                ))}
                            </VStack>
                        </div>
                    ))
                )}
            </VStack>
            {filmRecord && (
                <FilmModal
                    filmRecord={filmRecord}
                    filmData={filmData}
                    type="watched"
                    isOpen={isOpen}
                    onClose={onClose}
                    onListUpdate={refetch}
                />
            )}
        </>
    );
}
