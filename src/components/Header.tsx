import { IconButton, Flex, Text, FlexProps } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { SIDEBAR_WIDTH_CHAKRA } from "src/config/style.const";

interface HeaderProps extends FlexProps {
  onOpen: () => void;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpen,
  title,
  ...flexProps
}) => {
  return (
    <Flex
      ml={{ base: 0, md: SIDEBAR_WIDTH_CHAKRA }}
      px={4}
      position="sticky"
      top="0"
      height="20"
      zIndex="1"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...flexProps}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {title}
      </Text>
    </Flex>
  );
};
