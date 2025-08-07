import { CalendarIcon, InfoOutlineIcon, ViewIcon, AttachmentIcon } from "@chakra-ui/icons";
import { Table, TableContainer, Tbody } from "@chakra-ui/react";
import { EditableDateField } from "@/components/form/EditableDateField";
import { EditableCheckboxField } from "@/components/form/EditableCheckboxField";
import { EditableTextAreaField } from "@/components/form/EditableTextAreaField";
import { FilmModalHeader } from "../FilmModalHeader";
import { useToasts } from "@/hooks/useToasts";
import { useFilmData } from "@/hooks/useFilmData";
import { Watchlist } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";

interface WatchlistModalContentProps {
    recordId: number;
}

export const WatchlistModalContent = ({ recordId }: WatchlistModalContentProps) => {
    const [filmRecord, setFilmRecord] = useState<Watchlist>();
    const { showSuccessToast, showErrorToast } = useToasts();
    const { filmData } = useFilmData(filmRecord?.filmId);

    const [formData, setFormData] = useState({
        createdAt: "",
        recommendedBy: "",
        isWatched: false,
        note: "",
    });

    const fetchFilmRecord = useCallback(async (id: number) => {
        const response = await fetch(`/api/film/watchlist/${id}`, { method: "GET" });
        const record = await response.json();
        setFilmRecord(record);
    }, []);

    useEffect(() => {
        fetchFilmRecord(recordId);
    }, [recordId, fetchFilmRecord]);

    useEffect(() => {
        if (filmRecord) {
            setFormData({
                recommendedBy: filmRecord.recommendedBy || "",
                note: filmRecord.note || "",
                createdAt: dayjs(filmRecord.createdAt).format("YYYY-MM-DD"),
                isWatched: filmRecord.isWatched,
            });
        }
    }, [filmRecord]);

    const updateFilmRecord = async (fields: Partial<Watchlist>) => {
        const response = await fetch(`/api/film/watchlist/${recordId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fields),
        });
        return [await response.json(), response.status];
    };

    const handleEditSubmit = async (fields: Partial<Watchlist>) => {
        const [response, status] = await updateFilmRecord(fields);

        if (status === 201) {
            showSuccessToast("watchlist updated");
            await fetchFilmRecord(recordId);
        }
        if (status === 500) {
            showErrorToast("watchlist update failed", response.error);
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
    return (
        <>
            <FilmModalHeader filmData={filmData} filmId={filmRecord?.filmId || 0} />
            <TableContainer>
                <Table variant="unstyled" colorScheme="whiteAlpha" my={4}>
                    <Tbody>
                        <EditableDateField 
                            label="追加日" 
                            icon={<CalendarIcon />} 
                            value={formData.createdAt} 
                            isEditable={false} 
                            onSubmit={handleWatchlistFieldChange.createdAt} 
                        />
                        <EditableTextAreaField
                            label="おすすめ元"
                            icon={<InfoOutlineIcon />}
                            value={formData.recommendedBy}
                            isEditable={true}
                            onSubmit={handleWatchlistFieldChange.recommendedBy}
                        />
                        <EditableCheckboxField 
                            label="視聴済み" 
                            icon={<ViewIcon />} 
                            value={formData.isWatched} 
                            isEditable={true} 
                            onSubmit={handleWatchlistFieldChange.isWatched} 
                        />
                        <EditableTextAreaField
                            label="メモ"
                            icon={<AttachmentIcon />}
                            value={formData.note}
                            isEditable={true}
                            onSubmit={handleWatchlistFieldChange.note}
                            height={150}
                            submitOnBlur={true}
                            // onBlurで一時的な値を保存 (submitしない)してチェックボタン押した時だけ送信するように変更
                            // Overlayクリックでのモーダル終了時に注意ダイアログ出すのもあり
                        />
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};
