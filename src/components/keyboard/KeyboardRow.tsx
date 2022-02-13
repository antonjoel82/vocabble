import { Flex } from "@chakra-ui/react";

import { KeyboardKey, KeyboardKeyProps } from "./KeyboardKey";

export interface KeyboardRowProps {
  keyConfigs: KeyboardKeyProps[];
}

export const KeyboardRow: React.FC<KeyboardRowProps> = ({ keyConfigs }) => {
  return (
    <Flex justifyContent="center" gap={2}>
      {keyConfigs.map((keyProps) => (
        <KeyboardKey key={`key-${keyProps.label}`} {...keyProps} />
      ))}
    </Flex>
  );
};
