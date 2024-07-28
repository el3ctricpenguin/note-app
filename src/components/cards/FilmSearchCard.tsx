import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Card, CardBody, VStack, Image, Text, Skeleton, Link, LinkBox, LinkOverlay, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { TMDB_FILM_PAGE_URL } from "@/config/constants";

interface FilmSearchCardProps {
    title?: string;
    startYear?: number;
    posterUrl?: string;
    overview?: string;
    filmId?: number;
    disableRadius?: boolean;
    onClick?: () => void;
}

export const FilmSearchCard = ({ title, startYear, posterUrl, overview, filmId, disableRadius, onClick }: FilmSearchCardProps) => {
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    return (
        <Card
            overflow="hidden"
            w="100%"
            direction="row"
            bgColor="brand.cardBg"
            borderRadius={disableRadius ? 0 : "md"}
            as={LinkBox}
            onClick={onClick}
            cursor="pointer"
            _hover={{ bgColor: "brand.cardBgHover" }}
        >
            <Skeleton isLoaded={isImgLoaded}>
                <Image
                    h="100"
                    aspectRatio="2/3"
                    alt="film poster"
                    src={posterUrl}
                    fallbackSrc="https://placehold.co/500x750?text=film-app&font=raleway"
                    onLoad={() => setIsImgLoaded(true)}
                />
            </Skeleton>
            <CardBody>
                <VStack spacing={2} align="start">
                    <Text as={LinkOverlay} onClick={onClick} fontSize="xl" fontWeight="bold" w="100%">
                        <HStack justify="left" spacing={2}>
                            <Text noOfLines={1} wordBreak="break-all" maxW="calc(100% - 80px)">
                                {title ? title : "-"}
                            </Text>
                            <Text>{startYear && `(${startYear})`}</Text>
                            {filmId && (
                                <Link href={TMDB_FILM_PAGE_URL + "/" + filmId} target="_blank" cursor="pointer">
                                    <ExternalLinkIcon mb={1} />
                                </Link>
                            )}
                        </HStack>
                    </Text>
                    <Text noOfLines={1}>{overview}</Text>
                </VStack>
            </CardBody>
        </Card>
    );
};
