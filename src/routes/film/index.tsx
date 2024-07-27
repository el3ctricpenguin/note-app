import { FilmCard } from "@/components/cards/FilmCard";
import { FormControl, Heading, Input, Textarea, VStack } from "@chakra-ui/react";

export default function FilmNote() {
    const film = {
        rating: 4,
        title: "Thirteen Days",
        startYear: 2000,
        posterUrl:
            "https://m.media-amazon.com/images/M/MV5BZDM5NzBkZWMtZDY2Ny00OGMxLTgzMDUtZDZkNzRhM2M5MDIxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
        originCountries: ["US"],
    };
    const placeholderFilm = {
        rating: undefined,
        title: undefined,
        startYear: undefined,
        posterUrl: undefined,
        originCountries: undefined,
    };
    return (
        <>
            <Heading size="xl" mb={4}>
                film-note
            </Heading>
            <Heading size="lg" my={1}>
                映画登録
            </Heading>
            <FormControl mb={4}>
                <VStack spacing={2}>
                    <Input placeholder="映画名" variant="filled"></Input>
                    <FilmCard
                        rating={placeholderFilm.rating}
                        title={placeholderFilm.title}
                        startYear={placeholderFilm.startYear}
                        posterUrl={placeholderFilm.posterUrl}
                        originCountries={placeholderFilm.originCountries}
                    />
                    <Input placeholder="視聴した日付" type="date" value="" variant="filled" />
                    <Textarea placeholder="メモ" variant="filled"></Textarea>
                </VStack>
            </FormControl>
            <Heading size="lg" my={1}>
                視聴記録
            </Heading>
            <VStack>
                <Heading size="md" w="100%">
                    7/25
                </Heading>
                <FilmCard
                    rating={film.rating}
                    title={film.title}
                    startYear={film.startYear}
                    posterUrl={film.posterUrl}
                    originCountries={film.originCountries}
                />
            </VStack>
        </>
    );
}
