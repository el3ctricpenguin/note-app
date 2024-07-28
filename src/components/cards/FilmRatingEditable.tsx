import { DeleteIcon, SmallCloseIcon, StarIcon } from "@chakra-ui/icons";
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
    return (
        <HStack w="100%" align="center">
            {stars}
            <DeleteIcon
                w={4}
                ml={0.5}
                mt={0.25}
                onClick={() => {
                    setRating(0);
                }}
                color={rating == 0 ? "brand.gray.500" : "brand.gray.1000"}
            />
        </HStack>
    );
};
