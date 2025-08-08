"use client";

import { FilmCard } from "@/components/cards/FilmCard";
import { FilmRegistrationForm, WatchlistFormData } from "@/components/form/FilmRegistrationForm";
import { FilmModal } from "@/components/modals/FilmModal";
import { disabledLinkStyle, enabledLinkStyle } from "@/config/theme/styles";
import { useFilmModal } from "@/hooks/useFilmModal";
import { useToasts } from "@/hooks/useToasts";
import { Heading, Link, VStack } from "@chakra-ui/react";
import { Watchlist } from "@prisma/client";
import NextLink from "next/link";
import { useEffect, useState } from "react";

export default function FilmWatchlist() {
    const [watchlist, setWatchlist] = useState<Watchlist[]>([]);
    const fetchWatchlist = async () => {
        const response = await fetch(`/api/film/watchlist`, { method: "GET" });
        const watchlistFilms = await response.json();
        console.log(watchlistFilms);
        setWatchlist(watchlistFilms);
    };
    useEffect(() => {
        fetchWatchlist();
    }, []);

    const { showSuccessToast, showErrorToast } = useToasts();

    const handleWatchlistSubmit = async (data: WatchlistFormData): Promise<boolean> => {
        console.log(`create watchlist: ${data.filmId}`);

        const response = await fetch(`/api/film/watchlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filmId: data.filmId,
                recommendedBy: data.recommendedBy,
                note: data.watchlistNote,
                isWatched: false,
            }),
        });

        const result = await response.json();
        console.log(result);

        if (response.status === 201) {
            showSuccessToast("film registered");
            await fetchWatchlist();
            return true;
        } else {
            showErrorToast("film register failed", result.error);
            return false;
        }
    };

    const { recordId: watchlistId, isOpen, onClose, openModal } = useFilmModal();

    return (
        <>
            <Heading size="xl" mb={4}>
                <Link as={NextLink} href="/film" mr={4} {...enabledLinkStyle}>
                    /film
                </Link>
                <Link as={NextLink} href="/film/watchlist" mr={4} {...disabledLinkStyle}>
                    /watchlist
                </Link>
            </Heading>
            <Heading size="lg" my={1}>
                ウォッチリスト登録
            </Heading>
            <FilmRegistrationForm type="watchlist" onSubmit={handleWatchlistSubmit} />
            <Heading size="lg" my={1}>
                ウォッチリスト
            </Heading>
            <VStack>
                {watchlist.map((film, i) => (
                    <FilmCard key={i} filmId={film.filmId.toString()} onClick={() => openModal(film.id)} />
                ))}
            </VStack>
            {watchlistId && <FilmModal recordId={watchlistId} type="watchlist" isOpen={isOpen} onClose={onClose} />}
        </>
    );
}
