import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useEditableControls, ButtonGroup, IconButton, Flex } from "@chakra-ui/react";

export default function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

    return isEditing ? (
        <ButtonGroup justifyContent="center" size="sm">
            <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} aria-label="submit" />
            <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} aria-label="cancel" />
        </ButtonGroup>
    ) : (
        <Flex justifyContent="center">
            <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} aria-label="edit" />
        </Flex>
    );
}
