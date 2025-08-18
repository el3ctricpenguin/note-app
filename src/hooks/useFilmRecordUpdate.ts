import { useToasts } from "@/hooks/useToasts";
import { WatchedFilm, Watchlist } from "@prisma/client";
import { useCallback } from "react";

interface UseFilmRecordUpdateProps {
    recordId: number;
    type: "watched" | "watchlist";
    onUpdate?: () => void;
}

export const useFilmRecordUpdate = ({ recordId, type, onUpdate }: UseFilmRecordUpdateProps) => {
    const { showSuccessToast, showErrorToast } = useToasts();

    const updateFilmRecord = useCallback(
        async (fields: Partial<WatchedFilm | Watchlist>) => {
            const response = await fetch(`/api/film/${type}/${recordId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fields),
            });
            return [await response.json(), response.status];
        },
        [recordId, type],
    );

    const handleEditSubmit = useCallback(
        async (fields: Partial<WatchedFilm | Watchlist>) => {
            const [response, status] = await updateFilmRecord(fields);

            if (status === 201) {
                showSuccessToast(`${type} updated`);
                onUpdate?.();
            } else if (status === 500) {
                showErrorToast(`${type} update failed`, response.error);
            } else {
                console.error("Unexpected response:", response);
            }
        },
        [updateFilmRecord, type, showSuccessToast, showErrorToast, onUpdate],
    );

    const handleFieldChange = useCallback(
        (field: string, value: any, setFormData: (_updater: (_prev: any) => any) => void) => {
            setFormData((prev) => ({ ...prev, [field]: value }));

            const submitValue = value;

            handleEditSubmit({ [field]: submitValue });
        },
        [handleEditSubmit],
    );

    return {
        updateFilmRecord,
        handleEditSubmit,
        handleFieldChange,
    };
};
