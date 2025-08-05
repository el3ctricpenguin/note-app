"use client";

import { FilmCard } from "@/components/cards/FilmCard";
import { FilmRegistrationForm, WatchedFormData } from "@/components/form/FilmRegistrationForm";
import { FilmModal } from "@/components/modals/FilmModal";
import { apiUrl } from "@/config";
import { disabledLinkStyle, enabledLinkStyle } from "@/config/theme/styles";
import { useFilmModal } from "@/hooks/useFilmModal";
import { useToasts } from "@/hooks/useToasts";
import { GroupedFilms } from "@/types";
import { Heading, Link, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import NextLink from "next/link";
import { useEffect, useState } from "react";

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

    const { showSuccessToast, showErrorToast } = useToasts();

    const handleWatchedSubmit = async (data: WatchedFormData): Promise<boolean> => {
        console.log(`create watched film: ${data.filmId}`);
        const isoWatchedDate = dayjs(data.watchedDate).toISOString();

        const response = await fetch(`${apiUrl}/film/watched`, {
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
    };

    const { filmId: watchedFilmId, isOpen, onClose, openModal } = useFilmModal();

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
                {Object.entries(watchedFilmsByDate).map(([date, films]) => (
                    <>
                        <Heading size="md" w="100%">
                            {dayjs(date).format("MM/DD")}
                        </Heading>
                        {films.map((film, i) => (
                            <FilmCard key={i} rating={film.rating} filmId={film.filmId.toString()} onClick={() => openModal(film.id)} />
                        ))}
                    </>
                ))}
            </VStack>
            {watchedFilmId && <FilmModal id={watchedFilmId} type="watched" isOpen={isOpen} onClose={onClose} />}
        </>
    );
}
