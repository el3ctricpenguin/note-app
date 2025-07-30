import { HStack, VStack, Image, Text, Tooltip, Link, Skeleton } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { TMDB_IMAGE_API_URL_MD, TMDB_FILM_PAGE_URL } from "@/config/constants";
import getFlagEmoji from "@/features/utils/getFlagEmoji";
import { useState } from "react";

interface FilmModalHeaderProps {
    filmData: any;
    filmId: number;
}

export const FilmModalHeader = ({ filmData, filmId }: FilmModalHeaderProps) => {
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    return (
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
                            <Link href={TMDB_FILM_PAGE_URL + "/" + filmId} target="_blank" cursor="pointer">
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
    );
};
