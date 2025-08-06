import { Checkbox, Td, Tr } from "@chakra-ui/react";
import { useState } from "react";

interface EditableCheckboxFieldProps {
    label: string;
    icon: React.ReactElement;
    value: boolean;
    isEditable?: boolean;
    onSubmit?: (value: boolean) => void;
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
            <Td px={0} verticalAlign="top" py={3} w={100}>
                {icon}
                {label}
            </Td>
            <Td px={0} pl={4} whiteSpace="pre-line" py={3}>
                <Checkbox isChecked={currentValue} isDisabled={!isEditable} onChange={(e) => handleChange(e.target.checked)}>
                    {currentValue ? "視聴済み" : "未視聴"}
                </Checkbox>
            </Td>
        </Tr>
    );
};
