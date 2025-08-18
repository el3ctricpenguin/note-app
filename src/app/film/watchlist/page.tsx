"use client";

import { FilmCard } from "@/components/cards/FilmCard";
import { FilmRegistrationForm, WatchlistFormData } from "@/components/form/FilmRegistrationForm";
import { FilmModal } from "@/components/modals/FilmModal";
import { disabledLinkStyle, enabledLinkStyle } from "@/config/theme/styles";
import { useFilmModal } from "@/hooks/useFilmModal";
import { useToasts } from "@/hooks/useToasts";
import { useWatchlistFilms } from "@/hooks/useWatchlistFilms";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { Heading, Link, VStack, Spinner } from "@chakra-ui/react";
import NextLink from "next/link";

export default function FilmWatchlist() {
    const { watchlistFilms, isLoading, refetch } = useWatchlistFilms();

    const { showSuccessToast, showErrorToast } = useToasts();

    const handleWatchlistSubmit = async (data: WatchlistFormData): Promise<boolean> => {
        console.log(`create watchlist: ${data.filmId}`);

        try {
            const response = await fetchWithAuth(`/api/film/watchlist`, {
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
                await refetch();
                return true;
            } else {
                showErrorToast("film register failed", result.error);
                return false;
            }
        } catch (error) {
            console.error("Failed to register watchlist:", error);
            showErrorToast("film register failed");
            return false;
        }
    };

    const { filmRecord, filmData, isOpen, onClose, openModal } = useFilmModal("watchlist");

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
            <VStack spacing={4}>
                {isLoading ? (
                    <Spinner size="lg" />
                ) : watchlistFilms.length === 0 ? (
                    <Heading size="md">No watchlist</Heading>
                ) : (
                    watchlistFilms.map((film, i) => <FilmCard key={i} filmId={film.filmId.toString()} onClick={() => openModal(film.id)} />)
                )}
            </VStack>
            {filmRecord && (
                <FilmModal
                    filmRecord={filmRecord}
                    filmData={filmData}
                    type="watchlist"
                    isOpen={isOpen}
                    onClose={onClose}
                    onListUpdate={refetch}
                />
            )}
        </>
    );
}
