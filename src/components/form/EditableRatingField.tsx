import { Td, Tr, HStack, Editable, EditablePreview } from "@chakra-ui/react";
import { useState } from "react";
import { FilmRatingEditable } from "@/components/cards/FilmRatingEditable";
import { FilmRating } from "@/components/cards/FilmRating";
import EditableControls from "./EditableControls";

interface EditableRatingFieldProps {
    label: string;
    icon: React.ReactElement;
    value: number;
    isEditable?: boolean;
    onSubmit?: (_i: number) => void;
}

export const EditableRatingField = ({ label, icon, value, isEditable = true, onSubmit }: EditableRatingFieldProps) => {
    const [currentValue, setCurrentValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(currentValue);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setCurrentValue(value);
        setIsEditing(false);
    };

    return (
        <Tr>
            <Td px={0} verticalAlign="top" py={3} w={100}>
                {icon}
                {label}
            </Td>
            <Td px={0} pl={4} whiteSpace="pre-line" py={3}>
                {isEditable ? (
                    <Editable
                        value={value.toString()}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        onEdit={() => setIsEditing(true)}
                        selectAllOnFocus={false}
                        submitOnBlur={false}
                    >
                        <HStack>
                            {isEditing ? (
                                <FilmRatingEditable rating={currentValue} setRating={setCurrentValue} />
                            ) : (
                                <FilmRating rating={value} />
                            )}
                            <EditableControls />
                        </HStack>
                    </Editable>
                ) : (
                    <HStack>
                        <FilmRating rating={value} />
                    </HStack>
                )}
            </Td>
        </Tr>
    );
};
