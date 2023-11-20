import React from "react";
import { Text, Flex, Box } from "@chakra-ui/react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { NumberSlider } from "../components/Slider";
import styled from "@emotion/styled";
import {
  MIN_WORD_LENGTH,
  MAX_WORD_LENGTH,
  MIN_GUESS_LIMIT,
  MAX_GUESS_LIMIT,
} from "../config/game.const";

interface SettingsContentProps {}

const NumberBox = styled(Box)(
  ({ theme }) => `
  display: grid;
  place-content: center;
  border: 1px solid ${"blue"};
  border-radius: 4px;
  padding: 0.25rem 1rem;
`
);

export const SettingsContent: React.FC<SettingsContentProps> = ({}) => {
  const [guessLimit, setGuessLimit] = React.useState<number>(6);
  const [wordLength, setWordLength] = React.useState<number>(5);

  return (
    <>
      <Flex
        direction="column"
        justifyContent="start"
        width="100%"
        p={8}
        rowGap={4}
      >
        <Flex direction="row">
          <Text>Toggle Dark Mode!</Text>
          <DarkModeSwitch />
        </Flex>
        <Flex gap={8}>
          <Text textOverflow="ellipsis">Word Length: </Text>
          <NumberBox>
            <Text>{wordLength}</Text>
          </NumberBox>
          <NumberSlider
            min={MIN_WORD_LENGTH}
            max={MAX_WORD_LENGTH}
            value={wordLength}
            handleChange={setWordLength}
          />
        </Flex>
        <Flex>
          <Text>Guess Limit: </Text>
          <NumberSlider
            min={MIN_GUESS_LIMIT}
            max={MAX_GUESS_LIMIT}
            value={guessLimit}
            handleChange={setGuessLimit}
          />
        </Flex>
      </Flex>
    </>
  );
};
