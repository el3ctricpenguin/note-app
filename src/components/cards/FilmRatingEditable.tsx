import { StarIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";

export const FilmRatingEditable = ({ rating, setRating }: { rating: number; setRating: (i: number) => void }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            i < rating ? (
                <StarIcon
                    w={4}
                    key={i}
                    onClick={() => {
                        setRating(i + 1);
                    }}
                />
            ) : (
                <StarIcon
                    w={4}
                    opacity={0.5}
                    key={i}
                    onClick={() => {
                        setRating(i + 1);
                    }}
                />
            )
        );
    }
    return <HStack w="100%">{stars}</HStack>;
};
