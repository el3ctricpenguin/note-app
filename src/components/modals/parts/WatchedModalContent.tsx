import { CalendarIcon, StarIcon, AttachmentIcon } from "@chakra-ui/icons";
import { Table, TableContainer, Tbody } from "@chakra-ui/react";
import { EditableDateField } from "@/components/form/EditableDateField";
import { EditableRatingField } from "@/components/form/EditableRatingField";
import { EditableTextAreaField } from "@/components/form/EditableTextAreaField";
import { FilmModalHeader } from "./FilmModalHeader";
import { useFilmRecordUpdate } from "@/hooks/useFilmRecordUpdate";
import { WatchedFilm } from "@prisma/client";
import { TMDBFilmData } from "@/types";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";

interface WatchedModalContentProps {
    filmRecord: WatchedFilm;
    filmData: TMDBFilmData | null;
    onListUpdate?: () => void;
}

export const WatchedModalContent = ({ filmRecord, filmData, onListUpdate }: WatchedModalContentProps) => {
    const [formData, setFormData] = useState({
        watchedDate: "",
        rating: 0,
        note: "",
    });

    const fetchFilmRecord = useCallback(async (id: number) => {
        const response = await fetch(`/api/film/watched/${id}`, { method: "GET" });
        const record = await response.json();
        setFormData({
            rating: record.rating,
            note: record.note || "",
            watchedDate: dayjs(record.watchedDate).format("YYYY-MM-DD"),
        });
    }, []);

    const { handleFieldChange } = useFilmRecordUpdate({
        recordId: filmRecord.id,
        type: "watched",
        onUpdate: () => {
            fetchFilmRecord(filmRecord.id);
            onListUpdate?.();
        },
    });

    useEffect(() => {
        setFormData({
            rating: filmRecord.rating,
            note: filmRecord.note || "",
            watchedDate: dayjs(filmRecord.watchedDate).format("YYYY-MM-DD"),
        });
    }, [filmRecord]);

    const handleWatchedFieldChange = (field: string, value: any) => {
        handleFieldChange(field, value, setFormData, ["watchedDate"]);
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
                            onSubmit={(value) => handleWatchedFieldChange("watchedDate", value)}
                        />
                        <EditableRatingField
                            label="評価"
                            icon={<StarIcon />}
                            value={formData.rating}
                            isEditable={true}
                            onSubmit={(value) => handleWatchedFieldChange("rating", value)}
                        />
                        <EditableTextAreaField
                            label="メモ"
                            icon={<AttachmentIcon />}
                            value={formData.note}
                            isEditable={true}
                            onSubmit={(value) => handleWatchedFieldChange("note", value)}
                            height={150}
                            submitOnBlur={true}
                        />
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};
