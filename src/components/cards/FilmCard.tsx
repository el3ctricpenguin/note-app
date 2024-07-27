import getFlagEmoji from "@/features/utils/getFlagEmoji";
import { EditIcon } from "@chakra-ui/icons";
import { Card, CardBody, VStack, HStack, Image, Text, Skeleton } from "@chakra-ui/react";
import { FilmRating } from "@/components/cards/FilmRating";
import { useState } from "react";
import { TMDB_API_KEY } from "@/config";
import { TMDB_API_URL, TMDB_IMAGE_API_URL_MD } from "@/config/constants";
import { fetcher } from "@/features/utils/fetcher";
import useSWR from "swr";

interface FilmCardProps {
    rating?: number;
    filmId: string;
}

export const FilmCard = ({ rating, filmId }: FilmCardProps) => {
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    const { data, error, isLoading } = useSWR(`${TMDB_API_URL}/movie/${filmId}?language=en-US&api_key=${TMDB_API_KEY}`, fetcher);
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
                    <Text fontSize="xl" fontWeight="bold" w="100%">
                        {data
                            ? `${data.title} ${data.release_date && `(${data.release_date.split("-")[0]})`} ${getFlagEmoji(data.origin_country[0])}`
                            : "-"}
                    </Text>
                    <FilmRating rating={rating ? rating : 0} />
                </VStack>
            </CardBody>
            <HStack position="absolute" top={4} right={4}>
                <EditIcon />
            </HStack>
        </Card>
    );
};
