import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import theme from "../theme";
import { AppProps } from "next/app";
import { APP_NAME, MainLayout } from "../layout/MainLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
