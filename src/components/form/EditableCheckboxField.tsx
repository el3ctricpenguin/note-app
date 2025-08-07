import { Box, Checkbox, HStack, Td, Tr, Text } from "@chakra-ui/react";
import { useState } from "react";

interface EditableCheckboxFieldProps {
    label: string;
    icon: React.ReactElement;
    value: boolean;
    isEditable?: boolean;
    onSubmit?: (_value: boolean) => void;
}

export const EditableCheckboxField = ({ label, icon, value, isEditable = true, onSubmit }: EditableCheckboxFieldProps) => {
    const [currentValue, setCurrentValue] = useState(value);

    const handleChange = (checked: boolean) => {
        setCurrentValue(checked);
        if (onSubmit) {
            onSubmit(checked);
        }
    };

    return (
        <Tr>
            <Td px={0} verticalAlign="center" py={3} w={100} align="center">
                <HStack spacing={2} align="center">
                    {icon}
                    <Text>{label}</Text>
                </HStack>
            </Td>
            <Td px={0} pl={4} whiteSpace="pre-line" py={3} verticalAlign="center">
                <Checkbox p={0.5} isChecked={currentValue} isDisabled={!isEditable} onChange={(e) => handleChange(e.target.checked)} />
            </Td>
        </Tr>
    );
};
