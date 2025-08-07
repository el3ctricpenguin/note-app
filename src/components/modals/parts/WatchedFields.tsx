import { CalendarIcon, StarIcon, AttachmentIcon } from "@chakra-ui/icons";
import { EditableDateField } from "@/components/form/EditableDateField";
import { EditableRatingField } from "@/components/form/EditableRatingField";
import { EditableTextAreaField } from "@/components/form/EditableTextAreaField";

interface WatchedFieldsProps {
    watchedDate: string;
    rating: number;
    note: string;
    onWatchedDateChange?: (_value: string) => void;
    onRatingChange?: (_value: number) => void;
    onNoteChange?: (_value: string) => void;
}

export const WatchedFields = ({ watchedDate, rating, note, onWatchedDateChange, onRatingChange, onNoteChange }: WatchedFieldsProps) => {
    return (
        <>
            <EditableDateField
                label="視聴日"
                icon={<CalendarIcon />}
                value={watchedDate}
                isEditable={true}
                onSubmit={onWatchedDateChange}
            />
            <EditableRatingField label="評価" icon={<StarIcon />} value={rating} isEditable={true} onSubmit={onRatingChange} />
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
