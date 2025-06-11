import {
    Skeleton,
    Image,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tr,
    Text,
    HStack,
    Link,
    VStack,
    Tooltip,
    Editable,
    EditablePreview,
    EditableTextarea,
    useToast,
    EditableInput,
} from "@chakra-ui/react";
import { BasicModal } from "./BasicModal";
import { apiUrl, TMDB_API_KEY } from "@/config";
import { TMDB_API_URL, TMDB_FILM_PAGE_URL, TMDB_IMAGE_API_URL_MD } from "@/config/constants";
import { useCallback, useEffect, useState } from "react";
import { WatchedFilm } from "@prisma/client";
import { AttachmentIcon, StarIcon, RepeatClockIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import getFlagEmoji from "@/features/utils/getFlagEmoji";
import dayjs from "dayjs";
import { FilmRating } from "@/components/cards/FilmRating";
import EditableControls from "@/components/form/EditableControls";

interface WatchedFilmModalProps {
    watchedFilmId: number;
    isOpen: boolean;
    onClose: () => void;
}

export const WatchedFilmModal = ({ watchedFilmId, isOpen, onClose }: WatchedFilmModalProps) => {
    const [filmData, setFilmData] = useState<any>();
    const [watchedFilm, setWatchedFilm] = useState<WatchedFilm>();
    const [isImgLoaded, setIsImgLoaded] = useState(false);

    const fetchWatchedFilm = useCallback(async () => {
        const response = await fetch(`${apiUrl}/film/watched/${watchedFilmId}`, { method: "GET" });
        const watchedFilm = await response.json();
        setWatchedFilm(watchedFilm);
    }, [watchedFilmId]);
    const fetchFilmData = useCallback(async (filmId: number) => {
        const response = await fetch(`${TMDB_API_URL}/movie/${filmId}?language=en-US&api_key=${TMDB_API_KEY}`, { method: "GET" });
        const data = await response.json();
        console.log(data);
        setFilmData(data);
    }, []);
    useEffect(() => {
        if (watchedFilm) {
            if (watchedFilm.id !== watchedFilmId) {
                fetchWatchedFilm();
            } else {
                fetchFilmData(watchedFilm?.filmId);
            }
        } else {
            fetchWatchedFilm();
        }
    }, [watchedFilmId, fetchWatchedFilm, watchedFilm, fetchFilmData]);

    const [note, setNote] = useState("");
    const [watchedDate, setWatchedDate] = useState("");

    const toast = useToast();
    const updateWatchedFilm = async (
        watchedFilmId: string,
        filmId?: string,
        watchedDate?: string,
        rating?: number,
        note?: string
    ): Promise<[any, number]> => {
        console.log(`update watched film: ${filmId}`);
        const isoWatchedDate = dayjs(watchedDate).toISOString();
        console.log(note);

        const response = await fetch(`${apiUrl}/film/watched/${watchedFilmId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ filmId, watchedDate: isoWatchedDate, rating, note }),
        });
        return [await response.json(), response.status];
    };

    const handleEditFilmSubmit = async (filmId?: string, watchedDate?: string, rating?: number, note?: string) => {
        const [response, status] = await updateWatchedFilm(watchedFilmId.toString(), filmId, watchedDate, rating, note);
        console.log(response);

        if (status == 201) {
            toast({
                title: "film updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            await fetchWatchedFilm();
        }
        if (status == 500) {
            toast({
                title: "film update failed",
                description: `${response.error}`,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <BasicModal title="" isOpen={isOpen} onClose={onClose}>
            <Skeleton isLoaded={!filmData || isImgLoaded}>
                <HStack>
                    <Image
                        h="150"
                        aspectRatio="2/3"
                        alt="film poster"
                        src={filmData ? TMDB_IMAGE_API_URL_MD + filmData.poster_path : ""}
                        fallbackSrc="https://placehold.co/500x750?text=*-*&font=raleway"
                        onLoad={() => setIsImgLoaded(true)}
                    />
                    <VStack px={2} align="start">
                        <VStack spacing={0} align="flex-start">
                            <Tooltip label={filmData && `${filmData.original_title}`}>
                                <Text fontWeight="bold" noOfLines={2}>
                                    {filmData && `${filmData.original_title}`}
                                </Text>
                            </Tooltip>
                            <HStack>
                                <Text fontWeight="bold">
                                    {filmData && `(${filmData.release_date.split("-")[0]}) ${getFlagEmoji(filmData.origin_country[0])}`}
                                </Text>
                                <Link href={TMDB_FILM_PAGE_URL + "/" + watchedFilm?.filmId} target="_blank" cursor="pointer">
                                    <ExternalLinkIcon mb={1} />
                                </Link>
                            </HStack>
                        </VStack>
                        <Tooltip label={filmData && filmData.overview}>
                            <Text noOfLines={3}>{filmData && filmData.overview}</Text>
                        </Tooltip>
                    </VStack>
                </HStack>
            </Skeleton>
            {watchedFilm && watchedFilm.id == watchedFilmId && filmData && (
                <TableContainer>
                    <Table variant="unstyled" colorScheme="whiteAlpha" my={4}>
                        <Tbody>
                            <Tr>
                                <Td px={0} py={3}>
                                    <RepeatClockIcon mr={2} mb={1} />
                                    視聴日
                                </Td>
                                <Td px={0} pl={4} py={3}>
                                    <Editable
                                        defaultValue={dayjs(watchedFilm?.watchedDate).format("YYYY-MM-DD") ?? ""}
                                        onSubmit={() => handleEditFilmSubmit(undefined, watchedDate, undefined, undefined)}
                                        selectAllOnFocus={false}
                                        submitOnBlur={false}
                                    >
                                        <HStack>
                                            <EditablePreview />
                                            <EditableInput
                                                type="date"
                                                onChange={(e) => {
                                                    setWatchedDate(e.target.value);
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
                                <Td px={0} pl={4} whiteSpace="pre-line" py={3} pt={4}>
                                    <FilmRating rating={watchedFilm?.rating} />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td px={0} verticalAlign="top" py={3}>
                                    <AttachmentIcon mr={2} mb={1} />
                                    メモ
                                </Td>
                                <Td px={0} pl={4} whiteSpace="pre-line" py={3} w="full">
                                    <Editable
                                        defaultValue={watchedFilm?.note ?? ""}
                                        onSubmit={() => handleEditFilmSubmit(undefined, undefined, undefined, note)}
                                        selectAllOnFocus={false}
                                        // onBlurで一時的な値を保存 (submitしない)してチェックボタン押した時だけ送信するように変更
                                        // Overlayクリックでのモーダル終了時に注意ダイアログ出すのもあり
                                    >
                                        <HStack>
                                            <EditablePreview />
                                            <EditableTextarea
                                                onFocus={(e) => setNote(e.target.value)}
                                                onChange={(e) => setNote(e.target.value)}
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
