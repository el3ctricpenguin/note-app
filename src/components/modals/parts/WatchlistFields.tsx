import { CalendarIcon, InfoOutlineIcon, ViewIcon, AttachmentIcon } from "@chakra-ui/icons";
import { EditableDateField } from "@/components/form/EditableDateField";
import { EditableCheckboxField } from "@/components/form/EditableCheckboxField";
import { EditableTextAreaField } from "@/components/form/EditableTextAreaField";

interface WatchlistFieldsProps {
    createdAt: string;
    recommendedBy: string;
    isWatched: boolean;
    note: string;
    isEditable?: boolean;
    onCreatedAtChange?: (value: string) => void;
    onRecommendedByChange?: (value: string) => void;
    onIsWatchedChange?: (value: boolean) => void;
    onNoteChange?: (value: string) => void;
}

export const WatchlistFields = ({
    createdAt,
    recommendedBy,
    isWatched,
    note,
    isEditable = true,
    onCreatedAtChange,
    onRecommendedByChange,
    onIsWatchedChange,
    onNoteChange,
}: WatchlistFieldsProps) => {
    return (
        <>
            <EditableDateField
                label="追加日"
                icon={<CalendarIcon mr={2} />}
                value={createdAt}
                isEditable={isEditable}
                onSubmit={onCreatedAtChange}
            />
            <EditableTextAreaField
                label="おすすめ元"
                icon={<InfoOutlineIcon mr={2} />}
                value={recommendedBy}
                isEditable={isEditable}
                onSubmit={onRecommendedByChange}
                height={20}
            />
            <EditableCheckboxField
                label="視聴済み"
                icon={<ViewIcon mr={2} />}
                value={isWatched}
                isEditable={isEditable}
                onSubmit={onIsWatchedChange}
            />
            <EditableTextAreaField
                label="メモ"
                icon={<AttachmentIcon mr={2} />}
                value={note}
                isEditable={isEditable}
                onSubmit={onNoteChange}
            />
        </>
    );
};
