import { FilmCard } from "@/components/cards/FilmCard";
import { FilmSearchInput } from "@/components/form/FilmSearchInput";
import { useFilmSearch } from "@/hooks/useFilmSearch";
import { Button, FormControl, Input, Textarea, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { FormEvent, useState } from "react";

export interface WatchedFormData {
    filmId: string;
    rating: number;
    watchedDate: string;
    watchNote: string;
}

export interface WatchlistFormData {
    filmId: string;
    recommendedBy: string;
    watchlistNote: string;
}

interface WatchedFormProps {
    type: "watched";
    onSubmit: (_data: WatchedFormData) => Promise<boolean>;
}

interface WatchlistFormProps {
    type: "watchlist";
    onSubmit: (_data: WatchlistFormData) => Promise<boolean>;
}

type FilmRegistrationFormProps = WatchedFormProps | WatchlistFormProps;

export const FilmRegistrationForm = ({ type, onSubmit }: FilmRegistrationFormProps) => {
    const { searchText, setSearchText, searchResults, resetSearch } = useFilmSearch();
    const [filmId, setFilmId] = useState<string>("");

    // State for Watched
    const [rating, setRating] = useState<number>(0);
    const today = dayjs().format("YYYY-MM-DD");
    const [watchedDate, setWatchedDate] = useState<string>(today);
    const [watchNote, setWatchNote] = useState<string>("");

    // State for Watchlist
    const [recommendedBy, setRecommendedBy] = useState<string>("");
    const [watchlistNote, setWatchlistNote] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();

        let success: boolean;

        if (type === "watched") {
            const formData: WatchedFormData = { filmId, rating, watchedDate, watchNote };
            success = await onSubmit(formData);
        } else {
            const formData: WatchlistFormData = { filmId, recommendedBy, watchlistNote };
            success = await onSubmit(formData);
        }

        if (success) {
            // Reset Form
            setFilmId("");
            resetSearch();

            if (type === "watched") {
                setRating(0);
                setWatchedDate(today);
                setWatchNote("");
            } else {
                setRecommendedBy("");
                setWatchlistNote("");
            }
        }
    };

    return (
        <FormControl mb={4} as="form" onSubmit={handleSubmit}>
            <VStack spacing={2}>
                <FilmSearchInput
                    searchText={searchText}
                    setSearchText={setSearchText}
                    searchResults={searchResults}
                    onSelectFilm={setFilmId}
                />

                {type === "watched" ? <FilmCard rating={rating} setRating={setRating} filmId={filmId} /> : <FilmCard filmId={filmId} />}

                {type === "watched" ? (
                    <Input
                        placeholder="視聴した日付"
                        type="date"
                        variant="filled"
                        value={watchedDate}
                        onChange={(e) => setWatchedDate(e.target.value)}
                    />
                ) : (
                    <Input
                        placeholder="おすすめ元"
                        variant="filled"
                        value={recommendedBy}
                        onChange={(e) => setRecommendedBy(e.target.value)}
                    />
                )}

                <Textarea
                    placeholder="メモ"
                    variant="filled"
                    value={type === "watched" ? watchNote : watchlistNote}
                    onChange={(e) => {
                        if (type === "watched") {
                            setWatchNote(e.target.value);
                        } else {
                            setWatchlistNote(e.target.value);
                        }
                    }}
                />

                <Button
                    type="submit"
                    w="100%"
                    color="brand.gray.0"
                    bgColor="brand.gray.1000"
                    _hover={{ color: "brand.gray.0", bgColor: "brand.gray.1000", opacity: 0.75 }}
                >
                    登録
                </Button>
            </VStack>
        </FormControl>
    );
};
