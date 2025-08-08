import { Td, Tr, HStack, Editable, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FilmRatingEditable } from "@/components/cards/FilmRatingEditable";
import { FilmRating } from "@/components/cards/FilmRating";
import EditableControls from "./EditableControls";

interface EditableRatingFieldProps {
    label: string;
    icon: React.ReactElement;
    value: number | null;
    isEditable?: boolean;
    onSubmit?: (_i: number) => void;
}

export const EditableRatingField = ({ label, icon, value, isEditable = true, onSubmit }: EditableRatingFieldProps) => {
    const [currentValue, setCurrentValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = () => {
        if (onSubmit && currentValue !== null) {
            onSubmit(currentValue);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setCurrentValue(value);
        setIsEditing(false);
    };

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    return (
        <Tr>
            <Td px={0} verticalAlign="center" py={3} w={100}>
                <HStack spacing={2} align="center">
                    {icon}
                    <Text>{label}</Text>
                </HStack>
            </Td>
            <Td px={0} pl={4} whiteSpace="pre-line" py={3}>
                {isEditable && currentValue !== null ? (
                    <Editable
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
                                <FilmRating rating={currentValue} />
                            )}
                            <EditableControls />
                        </HStack>
                    </Editable>
                ) : (
                    <HStack>
                        <FilmRating rating={currentValue ?? 0} />
                    </HStack>
                )}
            </Td>
        </Tr>
    );
};
