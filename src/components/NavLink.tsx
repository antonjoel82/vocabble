import NextLink from "next/link";
import { Flex, FlexProps, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface NavLinkData {
  label: string;
  icon: IconType;
  href: string;
}

export interface NavLinkProps extends FlexProps {
  link: NavLinkData;
}

export const NavLink: React.FC<NavLinkProps> = ({ link, ...flexProps }) => {
  const { label, icon, href } = link;

  return (
    <NextLink href={href} passHref>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...flexProps}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        <Text fontSize="1.2rem">{label}</Text>
      </Flex>
    </NextLink>
  );
};
