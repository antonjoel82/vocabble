import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { FiHome, FiSettings, FiThumbsUp } from "react-icons/fi";

import { Header } from "../components/Header";
import { NavLinkData } from "../components/NavLink";
import { Sidebar } from "../components/Sidebar";

const LINK_ITEMS: NavLinkData[] = [
  { label: "Home", icon: FiHome, href: "/" },
  { label: "Standard Game", icon: FiThumbsUp, href: "/game" },
  // { label: "Settings", icon: FiSettings, href: "/settings" },
];

export const APP_NAME = "Vocabble";

export const MainLayout: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sidebarBaseProps = {
    onClose: onClose,
    linkItems: LINK_ITEMS,
    title: APP_NAME,
  };

  return (
    <Box minH="100vh" bg="gray.100">
      <Sidebar {...sidebarBaseProps} display={{ base: "none", md: "block" }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar {...sidebarBaseProps} />
        </DrawerContent>
      </Drawer>

      <Header onOpen={onOpen} title={APP_NAME} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};
