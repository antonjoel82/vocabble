import { Flex } from "@chakra-ui/react";

import { KeyboardKey, KeyboardKeyProps } from "./KeyboardKey";

export interface KeyboardRowProps {
  keyConfigs: KeyboardKeyProps[];
}

export const KeyboardRow: React.FC<KeyboardRowProps> = ({ keyConfigs }) => {
  return (
    <Flex justifyContent="center" gap={1}>
      {keyConfigs.map((keyProps, index) => (
        <KeyboardKey key={`key-${index}`} {...keyProps} />
      ))}
    </Flex>
  );
};
