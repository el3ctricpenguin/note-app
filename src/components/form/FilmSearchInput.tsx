import { FilmSearchCard } from "@/components/cards/FilmSearchCard";
import { TMDB_IMAGE_API_URL_MD } from "@/config/constants";
import { SearchIcon } from "@chakra-ui/icons";
import { Divider, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import { useState } from "react";

interface FilmSearchInputProps {
    searchText: string;
    setSearchText: (_: string) => void;
    searchResults: any;
    onSelectFilm: (_: string) => void;
    placeholder?: string;
}

export const FilmSearchInput = ({ searchText, setSearchText, searchResults, onSelectFilm }: FilmSearchInputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 150);
    };

    return (
        <>
            <InputGroup>
                <Input
                    placeholder="映画名"
                    variant="filled"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <InputRightElement pointerEvents="none">
                    <SearchIcon mr={2} />
                </InputRightElement>
            </InputGroup>
            {isFocused && (
                <VStack
                    w="100%"
                    spacing={0}
                    divider={<Divider borderColor="brand.gray.400" opacity={1} />}
                    position="absolute"
                    top={10}
                    zIndex={5}
                    borderRadius="md"
                    overflow="hidden"
                    border="1px"
                    borderColor="brand.gray.400"
                >
                    {searchResults?.results
                        .filter((_: any, i: number) => i < 5)
                        .map((film: any, i: any) => (
                            <FilmSearchCard
                                key={i}
                                title={film.original_title}
                                startYear={film.release_date.split("-")[0]}
                                posterUrl={TMDB_IMAGE_API_URL_MD + film.poster_path}
                                overview={film.overview}
                                filmId={film.id}
                                disableRadius
                                onClick={() => {
                                    onSelectFilm(film.id);
                                }}
                            />
                        ))}
                </VStack>
            )}
        </>
    );
};
