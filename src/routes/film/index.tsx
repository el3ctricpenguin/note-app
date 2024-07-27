import { FilmCard } from "@/components/Cards/FilmCard";
import { Heading, VStack } from "@chakra-ui/react";

export default function FilmNote() {
    const film = {
        rating: 4,
        title: {
            primary_title: "Thirteen Days",
            original_title: null,
            start_year: 2000,
            runtime_minutes: 145,
            plot: "In October 1962, the Kennedy administration struggles to contain the Cuban Missile Crisis.",
            posters: [
                {
                    url: "https://m.media-amazon.com/images/M/MV5BZDM5NzBkZWMtZDY2Ny00OGMxLTgzMDUtZDZkNzRhM2M5MDIxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
                    width: 1009,
                    height: 1500,
                },
            ],
            origin_countries: [
                {
                    code: "US",
                    name: "United States",
                },
            ],
        },
    };
    return (
        <>
            <Heading size="xl">film-note</Heading>
            <Heading size="lg">視聴記録</Heading>
            <VStack>
                <Heading size="md" w="100%">
                    7/25
                </Heading>
                <FilmCard film={film} />
            </VStack>
        </>
    );
}
