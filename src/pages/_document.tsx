import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import { APP_NAME } from "src/layout/MainLayout";
import { APP_BASE_URL } from "src/config";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta
            name="google-site-verification"
            content="Ba-BoHCYJcLeCHJpeMHs-5lx2VKS7Mo_zD7c9hPCb1c"
          />
          <meta property="og:title" content={APP_NAME} />
          <meta property="og:url" content={APP_BASE_URL} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta
            property="og:description"
            content="Word game with variable board sizes."
          />
          <meta property="og:image" content={"/vocabble.png"} />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
