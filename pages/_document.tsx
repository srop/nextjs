import Document, { DocumentContext, DocumentInitialProps } from "next/document";
import { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
        {/* <link
            rel="preload"
            href="/fonts/DBHeavent.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/DBHeavent.lite.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
