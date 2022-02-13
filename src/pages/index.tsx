import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";

const Index = () => (
  <Container height="100vh">
    <Hero title="Worrdle" />
    <Main>
      <Text>Messing with word games</Text>
    </Main>
  </Container>
);

export default Index;
