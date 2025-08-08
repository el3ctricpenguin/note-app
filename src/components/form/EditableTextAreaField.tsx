import { Editable, EditablePreview, EditableTextarea, HStack, Td, Text, Tr } from "@chakra-ui/react";
import { useState } from "react";
import EditableControls from "./EditableControls";

interface EditableTextAreaFieldProps {
    label: string;
    icon: React.ReactElement;
    value: string | null;
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
    height = 7,
    submitOnBlur = false,
}: EditableTextAreaFieldProps) => {
    const [currentValue, setCurrentValue] = useState(value);

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(currentValue || "");
        }
    };

    return (
        <Tr>
            <Td px={0} verticalAlign="center" py={3} w={100}>
                <HStack spacing={2} align="center">
                    {icon}
                    <Text>{label}</Text>
                </HStack>
            </Td>
            <Td px={0} pl={4} whiteSpace="pre-line" py={3}>
                {isEditable && value !== null ? (
                    <Editable defaultValue={value} onSubmit={handleSubmit} selectAllOnFocus={false} submitOnBlur={submitOnBlur}>
                        <HStack gap={value.length === 0 ? 0 : 2}>
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
                    <Text>{currentValue}</Text>
                )}
            </Td>
        </Tr>
    );
};
