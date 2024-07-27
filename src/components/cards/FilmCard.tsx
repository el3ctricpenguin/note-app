import getFlagEmoji from "@/features/utils/getFlagEmoji";
import { EditIcon } from "@chakra-ui/icons";
import { Card, CardBody, VStack, HStack, Image, Text, Skeleton } from "@chakra-ui/react";
import { FilmRating } from "@/components/cards/FilmRating";
import { useState } from "react";

interface FilmCardProps {
    rating?: number;
    title?: string;
    startYear?: number;
    posterUrl?: string;
    originCountries?: string[];
}

export const FilmCard = ({ rating, title, startYear, posterUrl, originCountries }: FilmCardProps) => {
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    return (
        <Card overflow="hidden" w="100%" direction="row" bgColor="brand.cardBg">
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
                <VStack spacing={2}>
                    <Text fontSize="xl" fontWeight="bold" w="100%">
                        {title ? title : "-"} {startYear && `(${startYear})`} {originCountries && getFlagEmoji(originCountries[0])}
                    </Text>
                    <FilmRating rating={rating ? rating : 0} />
                </VStack>
            </CardBody>
            <HStack position="absolute" top={4} right={4}>
                {/* <EditIcon /> */}
            </HStack>
        </Card>
    );
};
