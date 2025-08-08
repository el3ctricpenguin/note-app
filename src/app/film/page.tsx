"use client";

import { FilmCard } from "@/components/cards/FilmCard";
import { FilmRegistrationForm, WatchedFormData } from "@/components/form/FilmRegistrationForm";
import { FilmModal } from "@/components/modals/FilmModal";
import { disabledLinkStyle, enabledLinkStyle } from "@/config/theme/styles";
import { useFilmModal } from "@/hooks/useFilmModal";
import { useToasts } from "@/hooks/useToasts";
import { fetchWithAuth, fetchJsonWithAuth } from "@/lib/fetchWithAuth";
import { GroupedFilms } from "@/types";
import { Heading, Link, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import NextLink from "next/link";
import { useEffect, useState } from "react";

export default function FilmNote() {
    const [watchedFilmsByDate, setWatchedFilms] = useState<GroupedFilms>({});
    const fetchWatchedFilms = async () => {
        try {
            const watchedFilms = await fetchJsonWithAuth<GroupedFilms>(`/api/film/watched/by-date`);
            console.log(watchedFilms);
            setWatchedFilms(watchedFilms);
        } catch (error) {
            console.error("Failed to fetch watched films:", error);
        }
    };
    useEffect(() => {
        fetchWatchedFilms();
    }, []);

    const { showSuccessToast, showErrorToast } = useToasts();

    const handleWatchedSubmit = async (data: WatchedFormData): Promise<boolean> => {
        console.log(`create watched film: ${data.filmId}`);
        const isoWatchedDate = dayjs(data.watchedDate).toISOString();

        try {
            const response = await fetchWithAuth(`/api/film/watched`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    filmId: data.filmId,
                    watchedDate: isoWatchedDate,
                    rating: data.rating,
                    note: data.watchNote,
                }),
            });

            const result = await response.json();
            console.log(result);

            if (response.status === 201) {
                showSuccessToast("film registered");
                await fetchWatchedFilms();
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
    console.log(watchedFilmsByDate);
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
            <VStack>
                {Object.keys(watchedFilmsByDate).length === 0 ? (
                    <Heading size="md">No watched film</Heading>
                ) : (
                    Object.entries(watchedFilmsByDate).map(([date, films]) => (
                        <>
                            <Heading size="md" w="100%">
                                {dayjs(date).format("MM/DD")}
                            </Heading>
                            {films.map((film, i) => (
                                <FilmCard key={i} rating={film.rating} filmId={film.filmId.toString()} onClick={() => openModal(film.id)} />
                            ))}
                        </>
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
                    onListUpdate={fetchWatchedFilms}
                />
            )}
        </>
    );
}
