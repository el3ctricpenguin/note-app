import getFlagEmoji from "@/features/utils/getFlagEmoji";
import { EditIcon } from "@chakra-ui/icons";
import { Card, CardBody, VStack, HStack, Image, Text } from "@chakra-ui/react";
import { FilmRating } from "@/components/cards/FilmRating";

interface filmProps {
    rating: number;
    title: {
        primary_title: string;
        original_title: string | null;
        start_year: number;
        runtime_minutes: number;
        plot: string;
        posters: {
            url: string;
            width: number;
            height: number;
        }[];
        origin_countries: {
            code: string;
            name: string;
        }[];
    };
}

export const FilmCard = ({ film }: { film: filmProps }) => {
    return (
        <Card overflow="hidden" w="100%" direction="row" bgColor="brand.cardBg">
            <Image
                h="100"
                aspectRatio="2/3"
                alt="film poster"
                src="https://m.media-amazon.com/images/M/MV5BZDM5NzBkZWMtZDY2Ny00OGMxLTgzMDUtZDZkNzRhM2M5MDIxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1009_.jpg"
            />
            <CardBody>
                <VStack spacing={2}>
                    <Text fontSize="xl" fontWeight="bold" w="100%">
                        {film.title.primary_title} ({film.title.start_year}) {getFlagEmoji(film.title.origin_countries[0].code)}
                    </Text>
                    <FilmRating rating={film.rating} />
                </VStack>
            </CardBody>
            <HStack position="absolute" top={4} right={4}>
                <EditIcon />
            </HStack>
        </Card>
    );
};
