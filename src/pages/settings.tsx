import React from "react";
import { Text, Flex, Heading, Box } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { NumberSlider } from "../components/Slider";
import { SettingsContent } from "../components/SettingsContent";

export default () => {
  return (
    <Container height="100vh">
      <Heading size="2xl">Settings</Heading>
      <SettingsContent />
    </Container>
  );
};
