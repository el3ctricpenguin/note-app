import getFlagEmoji from "@/features/utils/getFlagEmoji";
import { EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Card, CardBody, VStack, HStack, Image, Text, Skeleton, Link, Box } from "@chakra-ui/react";
import { FilmRating } from "@/components/cards/FilmRating";
import { FilmRatingEditable } from "@/components/cards/FilmRatingEditable";
import { useState } from "react";
import { TMDB_API_KEY } from "@/config";
import { TMDB_API_URL, TMDB_FILM_PAGE_URL, TMDB_IMAGE_API_URL_MD } from "@/config/constants";
import { fetcher } from "@/features/utils/fetcher";
import useSWR from "swr";

interface FilmCardProps {
    filmId: string;
    rating?: number;
    setRating?: (i: number) => void;
}

export const FilmCard = ({ filmId, rating, setRating }: FilmCardProps) => {
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    const { data, error, isLoading } = useSWR(`${TMDB_API_URL}/movie/${filmId}?language=en-US&api_key=${TMDB_API_KEY}`, fetcher);
    // console.log(`${TMDB_API_URL}/movie/${filmId}?language=en-US&api_key=${TMDB_API_KEY}`);
    return (
        <Card overflow="hidden" w="100%" direction="row" bgColor="brand.cardBg">
            <Skeleton isLoaded={!data || isImgLoaded}>
                <Image
                    h="100"
                    aspectRatio="2/3"
                    alt="film poster"
                    src={data ? TMDB_IMAGE_API_URL_MD + data.poster_path : ""}
                    fallbackSrc="https://placehold.co/500x750?text=*-*&font=raleway"
                    onLoad={() => setIsImgLoaded(true)}
                />
            </Skeleton>
            <CardBody>
                <VStack spacing={2}>
                    <Box fontSize="xl" fontWeight="bold" w="100%">
                        {data ? (
                            <HStack justify="left" spacing={2}>
                                <Text noOfLines={1} wordBreak="break-all" maxW="calc(100% - 120px)">
                                    {data.title ? `${data.title}` : "-"}
                                </Text>
                                <Text>
                                    {data.release_date && `(${data.release_date.split("-")[0]})`} {getFlagEmoji(data.origin_country[0])}
                                </Text>
                                <Link href={TMDB_FILM_PAGE_URL + "/" + filmId} target="_blank" cursor="pointer">
                                    <ExternalLinkIcon mb={1} />
                                </Link>
                            </HStack>
                        ) : (
                            <Text>-</Text>
                        )}
                    </Box>

                    {rating == undefined ? (
                        ""
                    ) : setRating ? (
                        <FilmRatingEditable rating={rating} setRating={setRating} />
                    ) : (
                        <FilmRating rating={rating} />
                    )}
                </VStack>
            </CardBody>
            <HStack position="absolute" top={4} right={4}>
                {/* <EditIcon /> */}
            </HStack>
        </Card>
    );
};
