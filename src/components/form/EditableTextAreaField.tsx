import { Editable, EditablePreview, EditableTextarea, HStack, Td, Text, Tr } from "@chakra-ui/react";
import { useState } from "react";
import EditableControls from "./EditableControls";

interface EditableTextAreaFieldProps {
    label: string;
    icon: React.ReactElement;
    value: string;
    isEditable?: boolean;
    onSubmit?: (_value: string) => void;
    height?: number;
    submitOnBlur?: boolean;
}

export const EditableTextAreaField = ({
    label,
    icon,
    value,
    isEditable = true,
    onSubmit,
    height = 40,
    submitOnBlur = false,
}: EditableTextAreaFieldProps) => {
    const [currentValue, setCurrentValue] = useState(value);

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(currentValue);
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
                    <Editable defaultValue={value ?? ""} onSubmit={handleSubmit} selectAllOnFocus={false} submitOnBlur={submitOnBlur}>
                        <HStack>
                            <EditablePreview wordBreak="break-all" />
                            <EditableTextarea
                                onFocus={(e) => setCurrentValue(e.target.value)}
                                onChange={(e) => setCurrentValue(e.target.value)}
                                h={height}
                            />
                            <EditableControls />
                        </HStack>
                    </Editable>
                ) : (
                    <Text>{value}</Text>
                )}
            </Td>
        </Tr>
    );
};
