import { CalendarIcon, StarIcon, AttachmentIcon } from "@chakra-ui/icons";
import { Table, TableContainer, Tbody } from "@chakra-ui/react";
import { EditableDateField } from "@/components/form/EditableDateField";
import { EditableRatingField } from "@/components/form/EditableRatingField";
import { EditableTextAreaField } from "@/components/form/EditableTextAreaField";
import { FilmModalHeader } from "../FilmModalHeader";
import { useToasts } from "@/hooks/useToasts";
import { useFilmData } from "@/hooks/useFilmData";
import { WatchedFilm } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";

interface WatchedModalContentProps {
    recordId: number;
}

export const WatchedModalContent = ({ recordId }: WatchedModalContentProps) => {
    const [filmRecord, setFilmRecord] = useState<WatchedFilm>();
    const { showSuccessToast, showErrorToast } = useToasts();
    const { filmData } = useFilmData(filmRecord?.filmId);

    const [formData, setFormData] = useState({
        watchedDate: "",
        rating: 0,
        note: "",
    });

    const fetchFilmRecord = useCallback(async (id: number) => {
        const response = await fetch(`/api/film/watched/${id}`, { method: "GET" });
        const record = await response.json();
        setFilmRecord(record);
    }, []);

    useEffect(() => {
        fetchFilmRecord(recordId);
    }, [recordId, fetchFilmRecord]);

    useEffect(() => {
        if (filmRecord) {
            setFormData({
                rating: filmRecord.rating,
                note: filmRecord.note || "",
                watchedDate: dayjs(filmRecord.watchedDate).format("YYYY-MM-DD"),
            });
        }
    }, [filmRecord]);

    const updateFilmRecord = async (fields: Partial<WatchedFilm>) => {
        const response = await fetch(`/api/film/watched/${recordId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fields),
        });
        return [await response.json(), response.status];
    };

    const handleEditSubmit = async (fields: Partial<WatchedFilm>) => {
        const [response, status] = await updateFilmRecord(fields);

        if (status === 201) {
            showSuccessToast("watched updated");
            await fetchFilmRecord(recordId);
        }
        if (status === 500) {
            showErrorToast("watched update failed", response.error);
        }
        console.error("Unexpected response:", response);
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
        <>
            <FilmModalHeader filmData={filmData} filmId={filmRecord?.filmId || 0} />
            <TableContainer>
                <Table variant="unstyled" colorScheme="whiteAlpha" my={4}>
                    <Tbody>
                        <EditableDateField
                            label="視聴日"
                            icon={<CalendarIcon />}
                            value={formData.watchedDate}
                            isEditable={true}
                            onSubmit={handleWatchedFieldChange.watchedDate}
                        />
                        <EditableRatingField
                            label="評価"
                            icon={<StarIcon />}
                            value={formData.rating}
                            isEditable={true}
                            onSubmit={handleWatchedFieldChange.rating}
                        />
                        <EditableTextAreaField
                            label="メモ"
                            icon={<AttachmentIcon />}
                            value={formData.note}
                            isEditable={true}
                            onSubmit={handleWatchedFieldChange.note}
                            height={150}
                            submitOnBlur={true}
                        />
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};
