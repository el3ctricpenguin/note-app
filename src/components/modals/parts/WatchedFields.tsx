import { CalendarIcon, StarIcon, AttachmentIcon } from "@chakra-ui/icons";
import { EditableDateField } from "@/components/form/EditableDateField";
import { EditableRatingField } from "@/components/form/EditableRatingField";
import { EditableTextAreaField } from "@/components/form/EditableTextAreaField";

interface WatchedFieldsProps {
    watchedDate: string;
    rating: number;
    note: string;
    isEditable?: boolean;
    onWatchedDateChange?: (value: string) => void;
    onRatingChange?: (value: number) => void;
    onNoteChange?: (value: string) => void;
}

export const WatchedFields = ({
    watchedDate,
    rating,
    note,
    isEditable = true,
    onWatchedDateChange,
    onRatingChange,
    onNoteChange,
}: WatchedFieldsProps) => {
    return (
        <>
            <EditableDateField
                label="視聴日"
                icon={<CalendarIcon mr={2} />}
                value={watchedDate}
                isEditable={isEditable}
                onSubmit={onWatchedDateChange}
            />
            <EditableRatingField label="評価" icon={<StarIcon mr={2} />} value={rating} isEditable={isEditable} onSubmit={onRatingChange} />
            <EditableTextAreaField
                label="メモ"
                icon={<AttachmentIcon mr={2} />}
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
