import { FilmCard } from "@/components/cards/FilmCard";
import { TMDB_API_KEY } from "@/config";
import { TMDB_API_URL, TMDB_IMAGE_API_URL_MD } from "@/config/constants";
import { fetcher } from "@/features/utils/fetcher";
import { SearchIcon } from "@chakra-ui/icons";
import { FormControl, Heading, IconButton, Input, InputGroup, InputRightAddon, Text, useToast, VStack } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import useSWR from "swr";

export default function FilmSearch() {
    const placeholderFilm = {
        rating: undefined,
        title: undefined,
        startYear: undefined,
        posterUrl: undefined,
        originCountries: undefined,
    };
    const toast = useToast();

    const [searchText, setSearchText] = useState<string>("");

    const { data, error, isLoading } = useSWR(
        `${TMDB_API_URL}/search/movie?query=${searchText}&language=en-US&page=1&api_key=${TMDB_API_KEY}`,
        fetcher
    );
    console.log("isLoading", isLoading);
    console.log("error", error);
    console.log();

    function handleSubmit(e: FormEvent<HTMLDivElement>) {
        e.preventDefault();
        toast({
            title: `search ${searchText}`,
            status: "info",
            variant: "solid",
            duration: 1000,
            isClosable: true,
        });
    }

    return (
        <>
            <Heading size="xl" mb={4}>
                film-note:search
            </Heading>
            <VStack spacing={2}>
                <FormControl
                    as="form"
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <InputGroup>
                        <Input
                            placeholder="映画名"
                            variant="filled"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                        <InputRightAddon p={0}>
                            <IconButton aria-label="Search" icon={<SearchIcon />} borderLeftRadius={0} type="submit" />
                        </InputRightAddon>
                    </InputGroup>
                </FormControl>
                <VStack>
                    {data?.results
                        .filter((_: any, i: number) => i < 5)
                        .map((film: any, i: any) => (
                            <FilmCard
                                key={i}
                                rating={placeholderFilm.rating}
                                title={film.original_title}
                                startYear={film.release_date.split("-")[0]}
                                posterUrl={TMDB_IMAGE_API_URL_MD + film.poster_path}
                                originCountries={placeholderFilm.originCountries}
                            />
                        ))}
                </VStack>
            </VStack>
        </>
    );
}
