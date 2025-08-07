import { CalendarIcon, InfoOutlineIcon, ViewIcon, AttachmentIcon } from "@chakra-ui/icons";
import { EditableDateField } from "@/components/form/EditableDateField";
import { EditableCheckboxField } from "@/components/form/EditableCheckboxField";
import { EditableTextAreaField } from "@/components/form/EditableTextAreaField";

interface WatchlistFieldsProps {
    createdAt: string;
    recommendedBy: string;
    isWatched: boolean;
    note: string;
    onCreatedAtChange?: (_value: string) => void;
    onRecommendedByChange?: (_value: string) => void;
    onIsWatchedChange?: (_value: boolean) => void;
    onNoteChange?: (_value: string) => void;
}

export const WatchlistFields = ({
    createdAt,
    recommendedBy,
    isWatched,
    note,
    onCreatedAtChange,
    onRecommendedByChange,
    onIsWatchedChange,
    onNoteChange,
}: WatchlistFieldsProps) => {
    return (
        <>
            <EditableDateField label="追加日" icon={<CalendarIcon />} value={createdAt} isEditable={false} onSubmit={onCreatedAtChange} />
            <EditableTextAreaField
                label="おすすめ元"
                icon={<InfoOutlineIcon />}
                value={recommendedBy}
                isEditable={true}
                onSubmit={onRecommendedByChange}
            />
            <EditableCheckboxField label="視聴済み" icon={<ViewIcon />} value={isWatched} isEditable={true} onSubmit={onIsWatchedChange} />
            <EditableTextAreaField
                label="メモ"
                icon={<AttachmentIcon />}
                value={note}
                isEditable={true}
                onSubmit={onNoteChange}
                height={150}
                submitOnBlur={true}
                // onBlurで一時的な値を保存 (submitしない)してチェックボタン押した時だけ送信するように変更
                // Overlayクリックでのモーダル終了時に注意ダイアログ出すのもあり
            />
        </>
    );
};
