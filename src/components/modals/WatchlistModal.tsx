import {
    Button,
    List,
    ListIcon,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalContentProps,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Skeleton,
    Image,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tr,
    Input,
    Checkbox,
    Text,
    HStack,
    Link,
    VStack,
    Tooltip,
} from "@chakra-ui/react";
import { BasicModal } from "./BasicModal";
import { apiUrl, TMDB_API_KEY } from "@/config";
import { TMDB_API_URL, TMDB_FILM_PAGE_URL, TMDB_IMAGE_API_URL_MD } from "@/config/constants";
import { useCallback, useEffect, useState } from "react";
import { Watchlist } from "@prisma/client";
import { AttachmentIcon, BellIcon, RepeatClockIcon, CheckCircleIcon, NotAllowedIcon, ExternalLinkIcon, ViewIcon } from "@chakra-ui/icons";
import getFlagEmoji from "@/features/utils/getFlagEmoji";
import dayjs from "dayjs";
interface WatchlistModalProps {
    watchlistId: number;
    isOpen: boolean;
    onClose: () => void;
}
export const WatchlistModal = ({ watchlistId, isOpen, onClose }: WatchlistModalProps) => {
    console.log("watchlistId", watchlistId);
    const [filmData, setFilmData] = useState<any>();
    const [watchlist, setWatchlist] = useState<Watchlist>();
    const fetchWatchlist = useCallback(async () => {
        const response = await fetch(`${apiUrl}/film/watchlist/${watchlistId}`, { method: "GET" });
        const watchlistFilm = await response.json();
        console.log(watchlistFilm);
        setWatchlist(watchlistFilm);
    }, [watchlistId]);
    const fetchFilmData = useCallback(async (filmId: number) => {
        const response = await fetch(`${TMDB_API_URL}/movie/${filmId}?language=en-US&api_key=${TMDB_API_KEY}`, { method: "GET" });
        const data = await response.json();
        console.log(data);
        setFilmData(data);
    }, []);
    useEffect(() => {
        if (watchlist) {
            if (watchlist.id !== watchlistId) {
                fetchWatchlist();
            }
            fetchFilmData(watchlist?.filmId);
        } else {
            fetchWatchlist();
        }
    }, [watchlistId, fetchWatchlist, watchlist, fetchFilmData]);
    const [isImgLoaded, setIsImgLoaded] = useState(false);
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
                                <Link href={TMDB_FILM_PAGE_URL + "/" + watchlist?.filmId} target="_blank" cursor="pointer">
                                    <ExternalLinkIcon mb={1} />
                                </Link>
                            </HStack>
                        </VStack>
                        <Text noOfLines={3}>{filmData && filmData.overview}</Text>
                    </VStack>
                </HStack>
            </Skeleton>
            {watchlist && filmData && (
                <TableContainer>
                    <Table variant="unstyled" colorScheme="whiteAlpha" my={4}>
                        <Tbody>
                            <Tr>
                                <Td px={0} py={3}>
                                    <RepeatClockIcon mr={2} />
                                    追加日
                                </Td>
                                <Td px={0} pl={4} py={3}>
                                    {dayjs(watchlist?.createdAt).format("YYYY-MM-DD")}
                                </Td>
                            </Tr>
                            <Tr>
                                <Td px={0} verticalAlign="top" py={3}>
                                    <BellIcon mr={2} />
                                    おすすめ元
                                </Td>
                                <Td px={0} pl={4} whiteSpace="pre-line" py={3}>
                                    {watchlist?.recommendedBy}
                                </Td>
                            </Tr>
                            <Tr>
                                <Td px={0} verticalAlign="top" py={3}>
                                    <AttachmentIcon mr={2} />
                                    メモ
                                </Td>
                                <Td px={0} pl={4} whiteSpace="pre-line" py={3}>
                                    {watchlist?.note}
                                </Td>
                            </Tr>
                            <Tr>
                                <Td px={0} verticalAlign="top" py={3}>
                                    <ViewIcon mr={2} />
                                    視聴済み
                                </Td>
                                <Td px={0} pl={4} whiteSpace="pre-line" py={3}>
                                    <Checkbox isChecked={watchlist?.isWatched} h={5} />
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </BasicModal>
    );
};
