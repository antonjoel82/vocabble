import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FormEventHandler } from "react";
import { getRandomWordInfoForLength } from "src/api";
import { NumberStepper } from "src/components/NumberStepper";
import {
  DEFAULT_GUESS_LIMIT,
  DEFAULT_WORD_LENGTH,
  MAX_GUESS_LIMIT,
  MAX_WORD_LENGTH,
  MIN_GUESS_LIMIT,
  MIN_WORD_LENGTH,
} from "src/config";
import { createBoardUid } from "src/util/server";
import { WordlePageProps } from "./index";

const Page: NextPage<WordlePageProps> = (pageProps) => {
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const length = event.target[0].value;
    const guesses = event.target[1].value;

    const queryParams = new URLSearchParams({
      guesses,
      length,
    });
    router.push(`/?${queryParams.toString()}`);
  };

  return (
    <Container height="100vh">
      <Heading size="2xl">Custom Board</Heading>
      <Box mt={2}>
        <form onSubmit={handleSubmit}>
          <FormControl display={"flex"} alignItems={"center"} py={2}>
            <FormLabel textOverflow="ellipsis" fontSize={"lg"} mb={0}>
              Word Length
            </FormLabel>
            <NumberStepper
              name="length"
              defaultValue={DEFAULT_WORD_LENGTH}
              min={MIN_WORD_LENGTH}
              max={MAX_WORD_LENGTH}
            />
          </FormControl>
          <FormControl display={"flex"} alignItems={"center"}>
            <FormLabel textOverflow="ellipsis" fontSize={"lg"} mb={0}>
              Number of Guesses
            </FormLabel>
            <NumberStepper
              name="length"
              defaultValue={DEFAULT_GUESS_LIMIT}
              min={MIN_GUESS_LIMIT}
              max={MAX_GUESS_LIMIT}
            />
          </FormControl>
          <Button
            type="submit"
            py={5}
            fontWeight="bold"
            color="white"
            backgroundColor="green"
          >
            Start game!
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<
  WordlePageProps
> = async () => {
  const guessLimit = DEFAULT_GUESS_LIMIT;
  const targetWordInfo = getRandomWordInfoForLength(DEFAULT_WORD_LENGTH);
  const boardUid = createBoardUid(targetWordInfo.word, DEFAULT_GUESS_LIMIT);

  return {
    props: {
      guessLimit,
      targetWordInfo,
      boardUid,
    },
  };
};

export default Page;
