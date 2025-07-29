import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Tr,
    Checkbox,
    HStack,
    Editable,
    EditablePreview,
    EditableTextarea,
    EditableInput,
    IconButton,
} from "@chakra-ui/react";
import { BasicModal } from "./BasicModal";
import { FilmModalHeader } from "./FilmModalHeader";
import { useFilmModal } from "@/hooks/useFilmModal";
import { useToasts } from "@/hooks/useToasts";
import { apiUrl } from "@/config";
import { useEffect, useState, useCallback } from "react";
import { WatchedFilm, Watchlist } from "@prisma/client";
import { AttachmentIcon, InfoOutlineIcon, StarIcon, RepeatClockIcon, ViewIcon, CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import dayjs from "dayjs";
import { FilmRating } from "@/components/cards/FilmRating";
import EditableControls from "@/components/form/EditableControls";
import { FilmRatingEditable } from "@/components/cards/FilmRatingEditable";

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

    const fetchFilmRecord = useCallback(async (recordId: number) => {
        const endpoint = type === "watched" ? "watched" : "watchlist";
        const response = await fetch(`${apiUrl}/film/${endpoint}/${recordId}`, { method: "GET" });
        const record = await response.json();
        setFilmRecord(record);
    }, [type]);

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
        editRating: false,
    });

    useEffect(() => {
        if (filmRecord && type === "watched") {
            const watched = filmRecord as WatchedFilm;
            setFormData(prev => ({ ...prev, rating: watched.rating ?? 0 }));
        }
    }, [filmRecord, type]);

    const updateFilmRecord = async (fields: any) => {
        const endpoint = type === "watched" ? "watched" : "watchlist";
        const response = await fetch(`${apiUrl}/film/${endpoint}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fields),
        });
        return [await response.json(), response.status];
    };

    const handleEditSubmit = async (fields: any) => {
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

    const renderWatchlistFields = () => {
        const watchlist = filmRecord as Watchlist;
        return (
            <>
                <Tr>
                    <Td px={0} py={3} w={100}>
                        <RepeatClockIcon mr={2} mb={1} />
                        追加日
                    </Td>
                    <Td px={0} pl={4} py={3}>
                        {dayjs(watchlist?.createdAt).format("YYYY-MM-DD")}
                    </Td>
                </Tr>
                <Tr>
                    <Td px={0} verticalAlign="top" py={3} w={100}>
                        <InfoOutlineIcon mr={2} mb={1} />
                        おすすめ元
                    </Td>
                    <Td px={0} pl={4} whiteSpace="pre-line" py={3}>
                        <Editable
                            defaultValue={watchlist?.recommendedBy ?? ""}
                            onSubmit={() => handleEditSubmit({ recommendedBy: formData.recommendedBy })}
                            selectAllOnFocus={false}
                            submitOnBlur={false}
                        >
                            <HStack>
                                <EditablePreview wordBreak="break-all" />
                                <EditableTextarea
                                    onFocus={(e) => setFormData(prev => ({ ...prev, recommendedBy: e.target.value }))}
                                    onChange={(e) => setFormData(prev => ({ ...prev, recommendedBy: e.target.value }))}
                                    h={10}
                                />
                                <EditableControls />
                            </HStack>
                        </Editable>
                    </Td>
                </Tr>
                <Tr>
                    <Td px={0} verticalAlign="top" py={3} w={100}>
                        <ViewIcon mr={2} mb={1} />
                        視聴済み
                    </Td>
                    <Td px={0} pl={4} whiteSpace="pre-line" py={3}>
                        <Checkbox
                            isChecked={watchlist?.isWatched}
                            h={5}
                            onChange={(e) => {
                                handleEditSubmit({ isWatched: e.target.checked });
                            }}
                        />
                    </Td>
                </Tr>
            </>
        );
    };

    const renderWatchedFields = () => {
        const watched = filmRecord as WatchedFilm;
        return (
            <>
                <Tr>
                    <Td px={0} py={3}>
                        <RepeatClockIcon mr={2} mb={1} />
                        視聴日
                    </Td>
                    <Td px={0} pl={4} py={3}>
                        <Editable
                            defaultValue={dayjs(watched?.watchedDate).format("YYYY-MM-DD") ?? ""}
                            onSubmit={() => handleEditSubmit({ watchedDate: dayjs(formData.watchedDate).toISOString() })}
                            selectAllOnFocus={false}
                            submitOnBlur={false}
                        >
                            <HStack>
                                <EditablePreview />
                                <EditableInput
                                    type="date"
                                    onChange={(e) => {
                                        setFormData(prev => ({ ...prev, watchedDate: e.target.value }));
                                    }}
                                />
                                <EditableControls />
                            </HStack>
                        </Editable>
                    </Td>
                </Tr>
                <Tr>
                    <Td px={0} verticalAlign="top" py={3}>
                        <StarIcon mr={2} mb={1} />
                        評価
                    </Td>
                    <Td px={0} pl={4} py={1}>
                        {formData.editRating ? (
                            <HStack>
                                <FilmRatingEditable rating={formData.rating} setRating={(rating) => setFormData(prev => ({ ...prev, rating }))} />
                                <IconButton
                                    size="sm"
                                    icon={<CheckIcon />}
                                    aria-label="Save"
                                    onClick={async () => {
                                        await handleEditSubmit({ rating: formData.rating });
                                        setFormData(prev => ({ ...prev, editRating: false }));
                                    }}
                                />
                                <IconButton
                                    size="sm"
                                    icon={<CloseIcon />}
                                    aria-label="Cancel"
                                    onClick={() => {
                                        setFormData(prev => ({
                                            ...prev,
                                            rating: watched.rating ?? 0,
                                            editRating: false,
                                        }));
                                    }}
                                />
                            </HStack>
                        ) : (
                            <HStack>
                                <FilmRating rating={watched?.rating} />
                                <IconButton
                                    size="sm"
                                    icon={<EditIcon />}
                                    aria-label="Edit"
                                    onClick={() => setFormData(prev => ({ ...prev, editRating: true }))}
                                />
                            </HStack>
                        )}
                    </Td>
                </Tr>
            </>
        );
    };

    return (
        <BasicModal title="" isOpen={isOpen} onClose={onClose}>
            <FilmModalHeader filmData={filmData} filmId={filmRecord?.filmId || 0} />
            {filmRecord && filmData && (
                <TableContainer>
                    <Table variant="unstyled" colorScheme="whiteAlpha" my={4}>
                        <Tbody>
                            {type === "watchlist" ? renderWatchlistFields() : renderWatchedFields()}
                            <Tr>
                                <Td px={0} verticalAlign="top" py={3} w={100}>
                                    <AttachmentIcon mr={2} mb={1} />
                                    メモ
                                </Td>
                                <Td px={0} pl={4} whiteSpace="pre-line" py={3}>
                                    <Editable
                                        defaultValue={filmRecord?.note ?? ""}
                                        onSubmit={() => handleEditSubmit({ note: formData.note })}
                                        selectAllOnFocus={false}
                                        // onBlurで一時的な値を保存 (submitしない)してチェックボタン押した時だけ送信するように変更
                                        // Overlayクリックでのモーダル終了時に注意ダイアログ出すのもあり
                                    >
                                        <HStack>
                                            <EditablePreview wordBreak="break-all" />
                                            <EditableTextarea
                                                onFocus={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                                                onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                                                h={150}
                                            />
                                            <EditableControls />
                                        </HStack>
                                    </Editable>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </BasicModal>
    );
};