import { Table, TableContainer, Tbody } from "@chakra-ui/react";
import { BasicModal } from "./BasicModal";
import { FilmModalHeader } from "./FilmModalHeader";
import { WatchedFields } from "./parts/WatchedFields";
import { WatchlistFields } from "./parts/WatchlistFields";
import { useFilmModal } from "@/hooks/useFilmModal";
import { useToasts } from "@/hooks/useToasts";
import { apiUrl } from "@/config";
import { useEffect, useState, useCallback } from "react";
import { WatchedFilm, Watchlist } from "@prisma/client";
import dayjs from "dayjs";

interface FilmModalProps {
    id: number;
    type: "watched" | "watchlist";
    isOpen: boolean;
    onClose: () => void;
}

export const FilmModal = ({ id, type, isOpen, onClose }: FilmModalProps) => {
    const [filmRecord, setFilmRecord] = useState<WatchedFilm | Watchlist>();
    const { filmData } = useFilmModal(filmRecord?.filmId);
    const { showSuccessToast, showErrorToast } = useToasts();

    const fetchFilmRecord = useCallback(
        async (recordId: number) => {
            const endpoint = type === "watched" ? "watched" : "watchlist";
            const response = await fetch(`${apiUrl}/film/${endpoint}/${recordId}`, { method: "GET" });
            const record = await response.json();
            setFilmRecord(record);
        },
        [type],
    );

    useEffect(() => {
        if (filmRecord) {
            if (filmRecord.id !== id) {
                fetchFilmRecord(id);
            }
        } else {
            fetchFilmRecord(id);
        }
    }, [id, filmRecord, fetchFilmRecord]);

    const [formData, setFormData] = useState({
        recommendedBy: "",
        note: "",
        watchedDate: "",
        rating: 0,
        createdAt: "",
        isWatched: false,
    });

    useEffect(() => {
        if (filmRecord) {
            if (type === "watched") {
                const watched = filmRecord as WatchedFilm;
                setFormData((prev) => ({
                    ...prev,
                    rating: watched.rating,
                    note: watched.note || "",
                    watchedDate: dayjs(watched.watchedDate).format("YYYY-MM-DD"),
                }));
            } else {
                const watchlist = filmRecord as Watchlist;
                setFormData((prev) => ({
                    ...prev,
                    recommendedBy: watchlist.recommendedBy || "",
                    note: watchlist.note || "",
                    createdAt: dayjs(watchlist.createdAt).format("YYYY-MM-DD"),
                    isWatched: watchlist.isWatched,
                }));
            }
        }
    }, [filmRecord, type]);

    const updateFilmRecord = async (fields: Partial<WatchedFilm | Watchlist>) => {
        const endpoint = type === "watched" ? "watched" : "watchlist";
        const response = await fetch(`${apiUrl}/film/${endpoint}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fields),
        });
        return [await response.json(), response.status];
    };

    const handleEditSubmit = async (fields: Partial<WatchedFilm | Watchlist>) => {
        const [response, status] = await updateFilmRecord(fields);

        if (status === 201) {
            showSuccessToast(`${type} updated`);
            await fetchFilmRecord(id);
        }
        if (status === 500) {
            showErrorToast(`${type} update failed`, response.error);
        }
        console.error("Unexpected response:", response);
    };

    const handleWatchlistFieldChange = {
        createdAt: (value: string) => {
            setFormData((prev) => ({ ...prev, createdAt: value }));
            handleEditSubmit({ createdAt: new Date(dayjs(value).toISOString()) });
        },
        recommendedBy: (value: string) => {
            setFormData((prev) => ({ ...prev, recommendedBy: value }));
            handleEditSubmit({ recommendedBy: value });
        },
        isWatched: (value: boolean) => {
            setFormData((prev) => ({ ...prev, isWatched: value }));
            handleEditSubmit({ isWatched: value });
        },
        note: (value: string) => {
            setFormData((prev) => ({ ...prev, note: value }));
            handleEditSubmit({ note: value });
        },
    };

    const handleWatchedFieldChange = {
        watchedDate: (value: string) => {
            setFormData((prev) => ({ ...prev, watchedDate: value }));
            handleEditSubmit({ watchedDate: new Date(dayjs(value).toISOString()) });
        },
        rating: (value: number) => {
            setFormData((prev) => ({ ...prev, rating: value }));
            handleEditSubmit({ rating: value });
        },
        note: (value: string) => {
            setFormData((prev) => ({ ...prev, note: value }));
            handleEditSubmit({ note: value });
        },
    };

    return (
        <BasicModal title="" isOpen={isOpen} onClose={onClose}>
            <FilmModalHeader filmData={filmData} filmId={filmRecord?.filmId || 0} />
            {filmRecord && filmData && (
                <TableContainer>
                    <Table variant="unstyled" colorScheme="whiteAlpha" my={4}>
                        <Tbody>
                            {type === "watchlist" ? (
                                <WatchlistFields
                                    createdAt={formData.createdAt}
                                    recommendedBy={formData.recommendedBy}
                                    isWatched={formData.isWatched}
                                    note={formData.note}
                                    isEditable={true}
                                    onCreatedAtChange={handleWatchlistFieldChange.createdAt}
                                    onRecommendedByChange={handleWatchlistFieldChange.recommendedBy}
                                    onIsWatchedChange={handleWatchlistFieldChange.isWatched}
                                    onNoteChange={handleWatchlistFieldChange.note}
                                />
                            ) : (
                                <WatchedFields
                                    watchedDate={formData.watchedDate}
                                    rating={formData.rating}
                                    note={formData.note}
                                    isEditable={true}
                                    onWatchedDateChange={handleWatchedFieldChange.watchedDate}
                                    onRatingChange={handleWatchedFieldChange.rating}
                                    onNoteChange={handleWatchedFieldChange.note}
                                />
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </BasicModal>
    );
};
