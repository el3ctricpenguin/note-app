import { CalendarIcon, InfoOutlineIcon, ViewIcon, AttachmentIcon } from "@chakra-ui/icons";
import { Table, TableContainer, Tbody } from "@chakra-ui/react";
import { EditableDateField } from "@/components/form/EditableDateField";
import { EditableCheckboxField } from "@/components/form/EditableCheckboxField";
import { EditableTextAreaField } from "@/components/form/EditableTextAreaField";
import { FilmModalHeader } from "./FilmModalHeader";
import { useFilmRecordUpdate } from "@/hooks/useFilmRecordUpdate";
import { Watchlist } from "@prisma/client";
import { TMDBFilmData } from "@/types";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";

interface WatchlistModalContentProps {
    filmRecord: Watchlist;
    filmData: TMDBFilmData | null;
    onListUpdate?: () => void;
}

export const WatchlistModalContent = ({ filmRecord, filmData, onListUpdate }: WatchlistModalContentProps) => {
    const [formData, setFormData] = useState({
        createdAt: "",
        recommendedBy: "",
        isWatched: false,
        note: "",
    });

    const fetchFilmRecord = useCallback(async (id: number) => {
        const response = await fetch(`/api/film/watchlist/${id}`, { method: "GET" });
        const record = await response.json();
        setFormData({
            recommendedBy: record.recommendedBy || "",
            note: record.note || "",
            createdAt: dayjs(record.createdAt).format("YYYY-MM-DD"),
            isWatched: record.isWatched,
        });
    }, []);

    const { handleFieldChange } = useFilmRecordUpdate({
        recordId: filmRecord.id,
        type: "watchlist",
        onUpdate: () => {
            fetchFilmRecord(filmRecord.id);
            onListUpdate?.();
        },
    });

    useEffect(() => {
        setFormData({
            recommendedBy: filmRecord.recommendedBy || "",
            note: filmRecord.note || "",
            createdAt: dayjs(filmRecord.createdAt).format("YYYY-MM-DD"),
            isWatched: filmRecord.isWatched,
        });
    }, [filmRecord]);

    const handleWatchlistFieldChange = (field: string, value: any) => {
        handleFieldChange(field, value, setFormData, ["createdAt"]);
    };
    return (
        <>
            <FilmModalHeader filmData={filmData} filmId={filmRecord?.filmId || 0} />
            <TableContainer>
                <Table variant="unstyled" colorScheme="whiteAlpha" my={4}>
                    <Tbody>
                        <EditableDateField label="追加日" icon={<CalendarIcon />} value={formData.createdAt} isEditable={false} />
                        <EditableTextAreaField
                            label="おすすめ元"
                            icon={<InfoOutlineIcon />}
                            value={formData.recommendedBy}
                            isEditable={true}
                            onSubmit={(value) => handleWatchlistFieldChange("recommendedBy", value)}
                        />
                        <EditableCheckboxField
                            label="視聴済み"
                            icon={<ViewIcon />}
                            value={formData.isWatched}
                            isEditable={true}
                            onSubmit={(value) => handleWatchlistFieldChange("isWatched", value)}
                        />
                        <EditableTextAreaField
                            label="メモ"
                            icon={<AttachmentIcon />}
                            value={formData.note}
                            isEditable={true}
                            onSubmit={(value) => handleWatchlistFieldChange("note", value)}
                            height={150}
                            submitOnBlur={true}
                        />
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};
