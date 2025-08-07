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
                icon={<CalendarIcon />}
                value={createdAt}
                isEditable={isEditable}
                onSubmit={onCreatedAtChange}
            />
            <EditableTextAreaField
                label="おすすめ元"
                icon={<InfoOutlineIcon />}
                value={recommendedBy}
                isEditable={isEditable}
                onSubmit={onRecommendedByChange}
            />
            <EditableCheckboxField
                label="視聴済み"
                icon={<ViewIcon />}
                value={isWatched}
                isEditable={isEditable}
                onSubmit={onIsWatchedChange}
            />
            <EditableTextAreaField
                label="メモ"
                icon={<AttachmentIcon />}
                value={note}
                isEditable={isEditable}
                onSubmit={onNoteChange}
                height={150}
                submitOnBlur={true}
                // onBlurで一時的な値を保存 (submitしない)してチェックボタン押した時だけ送信するように変更
                // Overlayクリックでのモーダル終了時に注意ダイアログ出すのもあり
            />
        </>
    );
};
