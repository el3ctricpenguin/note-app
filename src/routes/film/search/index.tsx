import { FilmCard } from "@/components/cards/FilmCard";
import { SearchIcon } from "@chakra-ui/icons";
import { FormControl, Heading, IconButton, Input, InputGroup, InputRightAddon, Text, useToast, VStack } from "@chakra-ui/react";
import { FormEvent, useState } from "react";

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
            <Heading size="lg" my={1}>
                映画登録
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
                    <Text>searchText: {searchText}</Text>
                </VStack>
                <FilmCard
                    rating={placeholderFilm.rating}
                    title={placeholderFilm.title}
                    startYear={placeholderFilm.startYear}
                    posterUrl={placeholderFilm.posterUrl}
                    originCountries={placeholderFilm.originCountries}
                />
            </VStack>
        </>
    );
}
