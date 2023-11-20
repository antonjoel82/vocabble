import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, BoxProps, CloseButton, Flex, Text } from "@chakra-ui/react";

import { NavLink, NavLinkData } from "./NavLink";
import { SIDEBAR_WIDTH_CHAKRA } from "src/config/style.const";

interface SidebarProps extends BoxProps {
  linkItems: NavLinkData[];
  title: string;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onClose,
  linkItems,
  title,
  ...boxProps
}) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", onClose);
    return () => {
      router.events.off("routeChangeComplete", onClose);
    };
  }, [router.events, onClose]);

  return (
    <Box
      transition="3s ease"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: "full", md: SIDEBAR_WIDTH_CHAKRA }}
      pos="fixed"
      h="full"
      {...boxProps}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {title}
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {linkItems.map((link, i) => (
        <NavLink key={i} link={link} />
      ))}
    </Box>
  );
};
