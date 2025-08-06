import { Td, Tr, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FilmRatingEditable } from "@/components/cards/FilmRatingEditable";

interface EditableRatingFieldProps {
    label: string;
    icon: React.ReactElement;
    value: number;
    isEditable?: boolean;
    onSubmit?: (value: number) => void;
}

export const EditableRatingField = ({ label, icon, value, isEditable = true, onSubmit }: EditableRatingFieldProps) => {
    const [currentValue, setCurrentValue] = useState(value);

    const handleChange = (rating: number) => {
        setCurrentValue(rating);
        if (onSubmit) {
            onSubmit(rating);
        }
    };

    return (
        <Tr>
            <Td px={0} verticalAlign="top" py={3} w={100}>
                {icon}
                {label}
            </Td>
            <Td px={0} pl={4} whiteSpace="pre-line" py={3}>
                {isEditable ? (
                    <FilmRatingEditable rating={currentValue} setRating={handleChange} />
                ) : (
                    <HStack>
                        <Text>{currentValue}/5</Text>
                    </HStack>
                )}
            </Td>
        </Tr>
    );
};
