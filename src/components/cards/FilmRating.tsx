import { StarIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";

export const FilmRating = ({ rating }: { rating: number }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(i < rating ? <StarIcon w={4} key={i} /> : <StarIcon w={4} opacity={0.5} key={i} />);
    }
    return <HStack w="100%">{stars}</HStack>;
};
